"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Circle } from "lucide-react";
import { WalletAuthButton } from "@/components/auth/WalletAuthButton";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export function ElegantNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50",
        "flex justify-center py-6 px-4",
        "bg-transparent backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center w-full max-w-6xl px-6 py-3 rounded-3xl",
          "bg-white/[0.03] backdrop-blur-xl",
          "border border-white/[0.08]",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
        )}
      >

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <Circle className="h-2 w-2 fill-rose-500/80 animate-pulse" />
          <Link
            href="/"
            className="font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          >
            Proofly 
          </Link>
        </motion.div>


        <div className="flex items-center gap-6">

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-6"
          >

            <Link
              href="/commitment/create"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Create
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WalletAuthButton />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
