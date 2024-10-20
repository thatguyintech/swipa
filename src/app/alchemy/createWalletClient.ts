import { getSigner } from "./signer";
import { createWalletClient, http, WalletClient } from "viem";
import { base, sepolia } from "viem/chains";

export function getWalletClient(): WalletClient {
  if (global.globalWalletClient) {
    console.log("returning existing wallet client");
    return global.globalWalletClient;
  }

  const signer = getSigner();

  global.globalWalletClient = createWalletClient({
    transport: http(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    ),
    chain: base,
    account: signer.toViemAccount(),
  });

  return global.globalWalletClient;
}
