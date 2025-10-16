import { ElegantNavbar } from "@/components/layout/nav";
// import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { div } from "framer-motion/client";
import Image from "next/image";

export default function Home() {
  return (

    <HeroGeometric
      badge="on solana"
      title1="Put your commitment on chain"
      description="Stake your commitment, stay accountable — or pay the price."
    />

  );
}
