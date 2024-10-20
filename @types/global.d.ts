declare global {
  namespace NodeJS {
    interface Global {
      globalWalletClient: WalletClient;
      globalSigner: AlchemyWebSigner;
    }
  }
}
