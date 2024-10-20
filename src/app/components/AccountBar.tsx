"use client";

import { useLogout, useUser } from "@account-kit/react";

export const AccountBar = () => {
  const user = useUser();
  const { logout } = useLogout();
  return (
    <div className="flex flex-col gap-2 p-2">
      <p className="text-xl font-bold">Success!</p>
      You&apos;re logged in as {user?.email ?? "anon"}.
      <button className="btn btn-primary mt-6" onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
};
