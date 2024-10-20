import { AlchemyWebSigner } from "@account-kit/signer";

export function getSigner(): AlchemyWebSigner {
  if (global.globalSigner) {
    console.log("returning existing signer");
    return global.globalSigner;
  }

  global.globalSigner = new AlchemyWebSigner({
    client: {
      connection: {
        apiKey: process.env.ALCHEMY_API_KEY!,
      },
      iframeConfig: {
        iframeElementId: "alchemy-signer-iframe",
        iframeContainerId: "alchemy-signer-iframe-container",
      },
    },
  });

  return global.globalSigner;
}
