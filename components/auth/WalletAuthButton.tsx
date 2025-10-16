"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import bs58 from "bs58";
import { motion } from "framer-motion";

export function WalletAuthButton() {
  const { publicKey, signMessage, disconnect, connected } = useWallet();
  const { data: session } = useSession();
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

      const message = `Sign this message to authenticate with Proofly.\n\nWallet: ${publicKey.toString()}\nTimestamp: ${Date.now()}`;
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);
      const signatureBase58 = bs58.encode(signature);

      const result = await signIn("solana", {
        message,
        signature: signatureBase58,
        publicKey: publicKey.toString(),
        redirect: false,
      });

      if (result?.error) console.error("Sign in error:", result.error);
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
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex flex-col items-end text-right">
          <span className="text-sm font-semibold text-white/90">
            {session.user.name || "User"}
          </span>
          <span className="text-xs text-white/60 tracking-wide">
            {session.user.walletAddress?.slice(0, 4)}...
            {session.user.walletAddress?.slice(-4)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDisconnect}
          className="px-5 py-2 rounded-3xl text-sm font-medium text-white
            bg-gradient-to-r from-rose-500/90 to-indigo-500/90
            border border-white/[0.15] shadow-lg shadow-indigo-500/20
            hover:shadow-xl hover:shadow-indigo-500/30
            transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Disconnect</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-rose-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          (document.querySelector("button.wallet-adapter-button") as HTMLElement | null)?.click()
        }
        disabled={isAuthenticating}
        className={`px-6 py-2 rounded-3xl font-medium text-sm md:text-base text-white
    bg-gradient-to-r from-violet-500/90 to-cyan-500/90
    border border-white/[0.15] shadow-lg shadow-violet-500/20
    hover:shadow-xl hover:shadow-violet-500/30
    transition-all duration-300 relative overflow-hidden group
    ${isAuthenticating ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span className="relative z-10">
          {isAuthenticating ? "Authenticating..." : "Connect"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      <div className="hidden">
        <WalletMultiButton />
      </div>
    </motion.div>
  );
}
