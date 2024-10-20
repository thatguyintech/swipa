import type { NextApiRequest, NextApiResponse } from "next";

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
  req: NextApiRequest,
  res: NextApiResponse<QuoteResponse>,
) {
  const baseMainnetDegenQuote = `https://api.0x.org/swap/permit2/quote?chainId=8453&buyToken=0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed&sellToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&sellAmount=10000000000000&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`;

  try {
    const response = await fetch(baseMainnetDegenQuote, {
      headers: {
        "0x-api-key": process.env.OX_API_KEY || "",
        "0x-version": "v2",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return Response.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
