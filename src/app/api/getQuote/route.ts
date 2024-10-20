import { NextRequest, NextResponse } from "next/server";

type QuoteResponse = {
  transaction: {
    to: string;
    data: string;
    gas: string;
    gasPrice: string;
    value: string;
  };
  permit2: { eip712: {} };
};

/**
 * Get a quote for a swap on 0x
 *
 * We do this inside an API because we would get a CORS
 * error otherwise.
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<QuoteResponse | { error: string }>> {
  const chainId = 8453;
  const buyToken = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
  const sellToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const sellAmount = "100000000000";
  const taker = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  const baseMainnetDegenQuote = `https://api.0x.org/swap/permit2/quote?chainId=${chainId}&buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${sellAmount}&taker=${taker}`;

  try {
    const response = await fetch(baseMainnetDegenQuote, {
      headers: {
        "0x-api-key": process.env.OX_API_KEY || "",
        "0x-version": "v2",
      },
    });
    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 },
    );
  }
}
