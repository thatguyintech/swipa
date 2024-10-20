import { ethers } from "ethers";
import {
  Address,
  concat,
  createPublicClient,
  http,
  numberToHex,
  SignTypedDataParameters,
  size,
  TypedData,
  TypedDataDomain,
} from "viem";
import { getWalletClient, walletClient } from "./createWalletClient";
import { base } from "viem/chains";
import { getSigner } from "./signer";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  ),
});

export interface EIP712TypedData {
  types: TypedData;
  domain: TypedDataDomain;
  message: {
    [key: string]: unknown;
  };
  primaryType: string;
}

export const constructAAUserOperation = async (): Promise<{
  target: Address;
  data: `0x${string}`;
  value: bigint;
}> => {
  // Make API call to 0x
  const quote = await getQuote();
  const toAddress = quote.transaction.to;

  console.log(toAddress, getSigner().toViemAccount(), quote.transaction);

  return {
    // contract address
    target: quote.transaction.to,
    // call data for the user operation
    data: quote.transaction.data,
    // value to send to the contract
    value: quote.transaction.value,
  };
};

async function getQuote() {
  const response = await fetch("/api/getQuote");
  const data = await response.json();
  return data;
}

export async function doTrade() {
  try {
    // Make API call to 0x
    const quote = await getQuote();
    const toAddress = quote.transaction.to;

    // const signature = await getWalletClient().signTypedData(
    //   quote.permit2.eip712 as SignTypedDataParameters,
    // );

    // const signatureLengthInHex = numberToHex(size(signature), {
    //   signed: false,
    //   size: 32,
    // });

    // const data = concat([
    //   quote.transaction.data,
    //   signatureLengthInHex,
    //   signature,
    // ]);

    const hash = await getWalletClient().sendTransaction({
      data: quote.transaction.data,
      to: quote.transaction.to,
      value: BigInt(quote.transaction.value),
      account: getSigner().toViemAccount(),
      chain: undefined,
    });

    console.log("Transaction hash:", hash);

    const results = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Transaction results:", results);
    return { success: true, hash, results };
  } catch (error: any) {
    console.error("Error in doTrade:", error);
    return { success: false, error: error.message };
  }
}
