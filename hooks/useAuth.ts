"use client";

import { useSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";

export function useAuth() {
  const { data: session, status } = useSession();
  const { connected, publicKey } = useWallet();

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    walletConnected: connected,
    walletAddress: publicKey?.toString() || session?.user?.walletAddress,
  };
}