import { alchemy } from "@account-kit/infra";
import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { base } from "viem/chains";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "your-project-id" },
        },
      ],
    ],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig(
  {
    // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
    // get this from the app config you create at https://dashboard.alchemy.com/accounts
    transport: alchemy({ apiKey: process.env.ALCHEMY_API_KEY! }),
    chain: base,
    ssr: true, // set to false if you're not using server-side rendering
    enablePopupOauth: true,
    policyId: process.env.ALCHEMY_GAS_POLICY_ID!,
  },
  uiConfig,
);

export const queryClient = new QueryClient();
