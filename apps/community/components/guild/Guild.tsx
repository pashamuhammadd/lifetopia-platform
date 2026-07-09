import { PageHeader } from "@/components/ui/PageHeader";
import { GuildActivity } from "./GuildActivity";
import { GuildHero } from "./GuildHero";
import { GuildLeaderboard } from "./GuildLeaderboard";
import { GuildMembers } from "./GuildMembers";

export function Guild() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Guild"
        description="Join cozy guilds, complete quests together, and grow your Lifetopia community."
      />

      <GuildHero />

      <div className="grid gap-5 lg:grid-cols-2">
        <GuildMembers />
        <GuildActivity />
      </div>

      <GuildLeaderboard />
    </div>
  );
}