import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "flat",
  auth: {
    sections: [
      [{"type":"email"}],
      [
        {"type":"passkey"},
        {"type":"social","authProviderId":"google","mode":"popup"},
        {"type":"social","authProviderId":"facebook","mode":"popup"}
      ]
    ],
    addPasskeyOnSignup: false,
    // TODO: add logo as a react node
    // header: <img src="https://assets.deform.cc/Screenshot+2024-10-19+at+5.17.04+PM.png" alt="swipa meme logo" />,
  },
};

export const config = createConfig({
  // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
  // get this from the app config you create at https://dashboard.alchemy.com/accounts
  transport: alchemy({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_ACCOUNT_API_KEY) }),
  chain: sepolia,
  ssr: true, // set to false if you're not using server-side rendering
  enablePopupOauth: true,
}, uiConfig);


export const queryClient = new QueryClient();