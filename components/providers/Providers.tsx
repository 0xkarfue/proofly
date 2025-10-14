"use client";

import { SessionProvider } from "./SessionProvider";
import { WalletProvider } from "./WalletProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WalletProvider>{children}</WalletProvider>
    </SessionProvider>
  );
}