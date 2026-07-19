import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, CircleUserRound, FileText, Music2, Shield, Users, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Progress } from "@/components/ui/Progress";
import type { MyWorldDashboard as Dashboard } from "@/data/my-world";

const roleLabels: Record<string, string> = { founder: "World Founder", admin: "World Creator", developer: "World Builder", moderator: "Guardian", artist: "World Artist", alpha_tester: "Alpha Pioneer", beta_tester: "Beta Pioneer" };
const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-6)}`;

export function MyWorldDashboard({ dashboard }: { dashboard: Dashboard }) {
  const { profile, harmony, wallet, community, guilds, activity } = dashboard;
  return <div className="space-y-5 pb-24 md:pb-0">
    <PageHeader title="My World" description="Your real Lifetopia identity, CommunityHub progress, wallet, guilds, and recent activity." />

    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-[#edf7df] via-[#fffaf0] to-[#dff7ff] p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Image src={profile.avatarSrc} alt={profile.displayName} width={104} height={104} className="size-24 rounded-[28px] object-cover ring-4 ring-white sm:size-28" priority />
          <div className="min-w-0 flex-1"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8124]">{roleLabels[profile.role] ?? "Lifetopian"} · {profile.accountType}</p><h1 className="mt-1 truncate text-3xl font-black text-[#2f2418] sm:text-4xl">{profile.displayName}</h1><p className="mt-1 font-bold text-[#7a5635]">@{profile.username} · Joined {new Date(profile.joinedAt).toLocaleDateString("en",{month:"short",year:"numeric"})}</p></div>
          <Link href={`/user/${profile.username}`} className="rounded-full bg-[#4f8124] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#3e691c]">View public profile</Link>
        </div>
      </div>
    </Card>

    <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
      <Card className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f8124]">Community progression</p><h2 className="mt-1 text-3xl font-black text-[#2f2418]">{harmony.points.toLocaleString()} Harmony</h2><p className="mt-1 font-bold text-[#7a5635]">Harmony Level {harmony.level} · {harmony.progress}/{harmony.target} to next level</p></div><Music2 size={40} className="shrink-0 text-[#4f8124]" /></div><div className="mt-5"><Progress value={(harmony.progress/harmony.target)*100}/></div><p className="mt-3 text-xs font-bold text-[#9b6635]">Harmony is CommunityHub progression. It is not your Unity game level or game XP.</p><Link href="/quest" className="mt-5 inline-flex font-black text-[#4f8124]">Open daily quests →</Link></Card>
      <Card className="p-5 sm:p-6"><div className="flex items-center gap-3"><WalletCards className="text-[#4f8124]"/><h2 className="text-xl font-black text-[#2f2418]">Solana wallet</h2></div>{wallet.linked&&wallet.address?<><p className="mt-5 text-2xl font-black text-[#2f2418]">{shortAddress(wallet.address)}</p><p className="mt-1 text-sm font-bold text-[#4f8124]">Verified and linked</p></>:<><p className="mt-5 font-black text-[#2f2418]">No wallet linked</p><p className="mt-1 text-sm font-bold text-[#7a5635]">Connect a wallet to verify ownership.</p></>}<Link href="/wallet" className="mt-5 inline-flex font-black text-[#4f8124]">Manage wallet →</Link></Card>
    </div>

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[{label:"Posts",value:community.posts,icon:FileText,href:`/user/${profile.username}`},{label:"Followers",value:community.followers,icon:Users,href:`/user/${profile.username}/followers`},{label:"Following",value:community.following,icon:CircleUserRound,href:`/user/${profile.username}/following`},{label:"Claims today",value:`${community.dailyClaims}/5`,icon:CheckCircle2,href:"/quest"}].map(item=><Link href={item.href} key={item.label}><Card className="h-full p-4 transition hover:-translate-y-0.5 hover:border-[#9ec47c]"><item.icon size={20} className="text-[#4f8124]"/><p className="mt-3 text-2xl font-black text-[#2f2418]">{item.value}</p><p className="text-sm font-bold text-[#7a5635]">{item.label}</p></Card></Link>)}
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Shield className="text-[#4f8124]"/><h2 className="text-xl font-black text-[#2f2418]">My guilds</h2></div><Link href="/guild" className="text-sm font-black text-[#4f8124]">Discover</Link></div>{guilds.length?<div className="mt-4 space-y-3">{guilds.map(guild=><Link href={`/guild/${guild.slug}`} key={guild.id} className="block rounded-[18px] border border-[#ead9b8] p-4 transition hover:border-[#9ec47c]"><div className="flex items-center justify-between gap-3"><div><p className="font-black text-[#2f2418]">{guild.name}</p><p className="text-xs font-bold capitalize text-[#7a5635]">{guild.role} · {guild.status}</p></div><span className="text-sm font-black text-[#4f8124]">{guild.memberCount} members</span></div></Link>)}</div>:<div className="mt-5"><p className="font-black text-[#2f2418]">You have not joined a guild.</p><p className="mt-1 text-sm font-bold text-[#7a5635]">Discover a public guild or create your own.</p></div>}</Card>

      <Card className="p-5 sm:p-6"><div className="flex items-center gap-2"><BookOpen className="text-[#4f8124]"/><h2 className="text-xl font-black text-[#2f2418]">Recent activity</h2></div>{activity.length?<div className="mt-4 divide-y divide-[#ead9b8]">{activity.map(item=><Link href={item.href} key={item.id} className="block py-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-black text-[#2f2418]">{item.title}</p><p className="line-clamp-2 text-sm font-bold text-[#7a5635]">{item.detail}</p></div><time className="shrink-0 text-xs font-bold text-[#9b6635]">{new Date(item.createdAt).toLocaleDateString("en",{month:"short",day:"numeric"})}</time></div></Link>)}</div>:<p className="mt-5 text-sm font-bold text-[#7a5635]">Your real community activity will appear here.</p>}</Card>
    </div>
  </div>;
}
