import { CommitmentContent } from "@/components/CommitmentStep";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";

export default function Home() {
  return (

    <div>

      <HeroGeometric
        badge="on solana"
        title1="Put your commitment on chain"
        description="Stake your commitment, stay accountable — or pay the price."
      />
      <CommitmentContent />
    </div>

  );
}
