"use client";
import { useAuthModal, useSignerStatus, useUser } from "@account-kit/react";
import SwipingPage from "./components/SwipingPage";
import { AccountBar } from "./components/AccountBar";
import { Nav } from "./components/Nav";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();

  return (
    <main className="flex min-h-screen flex-col items-center py-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <>
          <Nav />
          <AccountBar />
          <SwipingPage />
        </>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
