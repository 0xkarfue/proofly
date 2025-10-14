"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [commitments, setCommitments] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCommitments();
    }
  }, [isAuthenticated]);

  const fetchCommitments = async () => {
    try {
      const res = await fetch("/api/commitments");
      const data = await res.json();
      if (data.success) {
        setCommitments(data.data);
      }
    } catch (error) {
      console.error("Error fetching commitments:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Connect Your Wallet</h1>
        <p className="text-gray-600">
          Connect your Solana wallet to access your dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user?.name || user?.walletAddress?.slice(0, 8)}
      </h1>
      
      <div className="grid gap-4">
        {commitments.map((commitment: any) => (
          <div key={commitment.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{commitment.description}</h3>
            <p className="text-sm text-gray-500">
              {commitment.stakeAmount} SOL • {commitment.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}