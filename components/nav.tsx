"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ');

type NavbarProps = {
  logo?: string;
  onCreateClick?: () => void;
  onConnectClick?: () => void;
  className?: string;
};

export function ElegantNavbar({
  logo = "Proofly",
  onCreateClick,
  onConnectClick,
  className,
}: NavbarProps) {
  return (
    <div className={cn("flex justify-center m-8", className)}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
        className={cn(
          "flex justify-between items-center w-[70%] p-4 rounded-3xl",
          "bg-white/[0.03] backdrop-blur-xl",
          "border border-white/[0.08]",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 p-2"
        >
          <Circle className="h-2 w-2 fill-rose-500/80 animate-pulse" />
          <h1 className="font-bold text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {logo}
          </h1>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateClick}
            className={cn(
              "px-6 py-2 rounded-3xl font-medium text-sm md:text-base",
              "bg-gradient-to-r from-indigo-500/90 to-rose-500/90",
              "text-white",
              "border border-white/[0.15]",
              "shadow-lg shadow-indigo-500/20",
              "hover:shadow-xl hover:shadow-indigo-500/30",
              "transition-all duration-300",
              "relative overflow-hidden group"
            )}
          >
            <span className="relative z-10">Create</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/50 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConnectClick}
            className={cn(
              "px-6 py-2 rounded-3xl font-medium text-sm md:text-base",
              "bg-gradient-to-r from-violet-500/90 to-cyan-500/90",
              "text-white",
              "border border-white/[0.15]",
              "shadow-lg shadow-violet-500/20",
              "hover:shadow-xl hover:shadow-violet-500/30",
              "transition-all duration-300",
              "relative overflow-hidden group"
            )}
          >
            <span className="relative z-10">Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export type { NavbarProps };