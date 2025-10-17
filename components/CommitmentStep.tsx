"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Users, Wallet, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

function FeatureCard({ icon: Icon, title, description, gradient, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative group"
    >
      <div className={cn(
        "relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]",
        "backdrop-blur-sm transition-all duration-500",
        "hover:bg-white/[0.04] hover:border-white/[0.15]"
      )}>
        <div className={cn(
          "w-14 h-14 rounded-xl mb-6 flex items-center justify-center",
          "bg-gradient-to-br", gradient,
          "shadow-lg transition-transform duration-500 group-hover:scale-110"
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-white/40 leading-relaxed">{description}</p>
        
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br", gradient, "blur-xl -z-10"
        )} />
      </div>
    </motion.div>
  );
}

function StepCard({ number, title, description, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="flex gap-6 items-start"
    >
      <div className="relative flex-shrink-0">
        <motion.div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-indigo-500 to-rose-500",
            "text-white font-bold text-lg shadow-lg"
          )}
        >
          {number}
        </motion.div>
        {index < 3 && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-indigo-500/50 to-transparent" />
        )}
      </div>
      
      <div className="flex-1 pt-2">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/40 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function CommitmentContent() {
  const featuresRef = useRef(null);
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const featuresY = useTransform(featuresProgress, [0, 1], [100, -100]);

  return (
    <div className="bg-[#030303]">
      {/* Features Section */}
      <section ref={featuresRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-indigo-500/[0.02] to-[#030303]" />
        
        <motion.div 
          style={{ y: featuresY }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />
        
        <div className="relative container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Two powerful options to keep you accountable. Choose the motivation that works for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <FeatureCard
              icon={Lock}
              title="Stack Mode"
              description="Your funds get locked for 10 years if you fail. The ultimate long-term accountability that makes breaking commitments extremely costly."
              gradient="from-indigo-500/20 to-purple-500/20"
              index={0}
            />
            
            <FeatureCard
              icon={Users}
              title="Pool Mode"
              description="Fail your commitment and your money gets distributed among your friends. Social pressure meets financial stakes."
              gradient="from-rose-500/20 to-orange-500/20"
              index={1}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Wallet}
              title="Solana Blockchain"
              description="Built on Solana for lightning-fast transactions and minimal fees. Your commitments are secured by blockchain technology."
              gradient="from-cyan-500/20 to-blue-500/20"
              index={2}
            />
            
            <FeatureCard
              icon={Target}
              title="Set Your Goals"
              description="Create custom commitments with your own deadlines and stakes. From fitness goals to learning targets, anything goes."
              gradient="from-emerald-500/20 to-teal-500/20"
              index={3}
            />
            
            <FeatureCard
              icon={TrendingUp}
              title="Prove & Reclaim"
              description="Complete your commitment, provide proof, and get your money back. Success should be rewarded, not penalized."
              gradient="from-amber-500/20 to-yellow-500/20"
              index={4}
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-rose-500/[0.02] to-[#030303]" />
        
        <div className="relative container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Simple steps to create your first commitment and start achieving your goals.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            <StepCard
              number="1"
              title="Connect Your Wallet"
              description="Link your Solana wallet to get started. We support all major Solana wallets including Phantom, Solflare, and more."
              index={0}
            />
            
            <StepCard
              number="2"
              title="Create Your Commitment"
              description="Define your goal, set a deadline, and decide how much SOL you want to stake. Be specific about what you're committing to."
              index={1}
            />
            
            <StepCard
              number="3"
              title="Choose Your Accountability Mode"
              description="Select Stack Mode (10-year lock) or Pool Mode (distribute to friends). Pick what motivates you most."
              index={2}
            />
            
            <StepCard
              number="4"
              title="Complete & Claim Your Reward"
              description="Finish your commitment, submit proof of completion, and get your stake back. Or face the consequences if you don't follow through."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-indigo-500/[0.05] to-[#030303]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative container mx-auto px-4 md:px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 md:p-20 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-rose-500/10 border border-white/[0.08] backdrop-blur-sm">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Commit?
              </h2>
              
              <p className="text-white/40 text-lg mb-8 max-w-2xl mx-auto">
                Turn your goals into reality with the power of blockchain accountability. Your future self will thank you.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-8 py-4 rounded-xl font-semibold text-white",
                  "bg-gradient-to-r from-indigo-500 to-rose-500",
                  "shadow-lg hover:shadow-indigo-500/25 transition-shadow duration-300"
                )}
              >
                Launch App
              </motion.button>
              
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 blur-3xl -z-10" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}