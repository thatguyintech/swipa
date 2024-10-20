import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { config } from "./config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Embedded Accounts UI Components Quickstart NextJs Template",
  description: "Embedded Accounts UI Components Quickstart NextJs Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined,
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="alchemy-signer-iframe-container"></div>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
