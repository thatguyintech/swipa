import { AlchemyWebSigner } from "@account-kit/signer";

declare global {
  var globalSigner: AlchemyWebSigner | undefined;
}

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

  console.log("returning new signer", global.globalSigner);

  return global.globalSigner;
}
