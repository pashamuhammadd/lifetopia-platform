import type{Metadata}from"next";import{Guild}from"@/components/guild/Guild";import{AppLayout}from"@/components/layout/AppLayout";import{getCommunityGuilds}from"@/data/guilds";
export const metadata:Metadata={title:"Guilds",description:"Discover public Lifetopia guilds and real membership.",alternates:{canonical:"/guild"}};
export default async function GuildPage(){const guilds=await getCommunityGuilds();return <AppLayout><Guild guilds={guilds}/></AppLayout>}
