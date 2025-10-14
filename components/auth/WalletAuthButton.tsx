"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import bs58 from "bs58";

export function WalletAuthButton() {
  const { publicKey, signMessage, disconnect, connected } = useWallet();
  const { data: session, status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const handleAuth = async () => {
      if (connected && publicKey && !session && signMessage && !isAuthenticating) {
        await authenticate();
      }
    };

    handleAuth();
  }, [connected, publicKey, session, signMessage]);

  const authenticate = async () => {
    try {
      if (!publicKey || !signMessage) return;

      setIsAuthenticating(true);

      // Create message to sign
      const message = `Sign this message to authenticate with Proofly.\n\nWallet: ${publicKey.toString()}\nTimestamp: ${Date.now()}`;
      const messageBytes = new TextEncoder().encode(message);

      // Sign message
      const signature = await signMessage(messageBytes);
      const signatureBase58 = bs58.encode(signature);

      // Sign in with NextAuth
      const result = await signIn("solana", {
        message,
        signature: signatureBase58,
        publicKey: publicKey.toString(),
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    await signOut({ redirect: false });
    await disconnect();
  };

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm">
          <div className="font-medium">{session.user.name || "User"}</div>
          <div className="text-gray-500">
            {session.user.walletAddress?.slice(0, 4)}...
            {session.user.walletAddress?.slice(-4)}
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <WalletMultiButton />
      {isAuthenticating && (
        <span className="text-sm text-gray-500">Authenticating...</span>
      )}
    </div>
  );
}