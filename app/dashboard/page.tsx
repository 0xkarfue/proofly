"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CommitmentMode = "stack" | "pool" | null

export default function CommitmentDashboard() {
  const [commitmentText, setCommitmentText] = useState("")
  const [mode, setMode] = useState<CommitmentMode>(null)
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredInfo, setHoveredInfo] = useState<CommitmentMode>(null)

  const handleCreate = async () => {
    if (!commitmentText || !mode || !amount) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Simulate Solana transaction
      console.log("Creating commitment:", {
        commitment: commitmentText,
        mode,
        amount,
      })

      // In a real app, this would trigger a Solana wallet transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(`Commitment created! ${amount} SOL locked in ${mode} mode.`)
      setCommitmentText("")
      setMode(null)
      setAmount("")
    } catch (error) {
      console.error("Error creating commitment:", error)
      alert("Failed to create commitment")
    } finally {
      setIsLoading(false)
    }
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
    }),
  }

  const transitionConfig = {
    duration: 0.6,
    delay: (i: number) => i * 0.1,
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030303] py-20 px-4 md:px-6 pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-2xl">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
            Create Your Commitment
          </h2>
          <p className="text-white/50 text-lg">
            Lock in your goals on Solana blockchain. Your commitment is immutable and transparent.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-md p-8 space-y-8">
            {/* Commitment Text Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">Your Commitment</label>
              <textarea
                value={commitmentText}
                onChange={(e) => setCommitmentText(e.target.value)}
                placeholder="e.g., I will run for 10 days with no breaks"
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                rows={3}
              />
            </div>

            {/* Mode Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">Choose Mode</label>
              <div className="grid grid-cols-2 gap-4">
                {(["stack", "pool"] as const).map((m) => (
                  <motion.button
                    key={m}
                    onClick={() => setMode(m)}
                    onMouseEnter={() => setHoveredInfo(m)}
                    onMouseLeave={() => setHoveredInfo(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative p-4 rounded-lg border transition-all duration-300 flex items-center justify-between",
                      mode === m
                        ? "bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border-indigo-500/50"
                        : "bg-white/[0.03] border-white/[0.1] hover:border-white/[0.2]",
                    )}
                  >
                    <span className="font-medium text-white capitalize">{m}</span>
                    <div className="relative">
                      <Info
                        size={18}
                        className={cn("transition-colors", hoveredInfo === m ? "text-indigo-400" : "text-white/40")}
                      />
                      {hoveredInfo === m && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full right-0 mb-2 w-48 bg-white/[0.1] border border-white/[0.2] rounded-lg p-3 text-xs text-white/80 backdrop-blur-md"
                        >
                          {m === "stack"
                            ? "Your money will be stacked and locked for 10 years"
                            : "Your money will be distributed among your friends"}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">Amount (SOL)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in SOL"
                className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/30"
              />
            </div>

            {/* Create Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCreate}
                disabled={isLoading || !commitmentText || !mode || !amount}
                className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Commitment"}
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
