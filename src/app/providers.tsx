"use client";

import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { config, queryClient } from "./config";
import { NavProvider } from "./contexts/NavContext";
import { SwipesProvider } from "./contexts/SwipesContext";
import { MemecoinProvider } from "./contexts/MemecoinContext";
import { UserMemesProvider } from "./contexts/UserMemesContext";

export const Providers = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>,
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={props.initialState}
      >
        <UserMemesProvider>
          <MemecoinProvider>
            <NavProvider>
              <SwipesProvider>{props.children}</SwipesProvider>
            </NavProvider>
          </MemecoinProvider>
        </UserMemesProvider>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
