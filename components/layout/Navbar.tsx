"use client";

import Link from "next/link";
import { WalletAuthButton } from "@/components/auth/WalletAuthButton";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Proofly 💪
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/create" className="text-gray-700 hover:text-blue-600">
            Create
          </Link>
          
          {/* This is the wallet connect button */}
          <WalletAuthButton />
        </div>
      </div>
    </nav>
  );
}