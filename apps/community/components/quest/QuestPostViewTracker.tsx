"use client";
import{useEffect,useRef}from"react";import{recordQuestPostView}from"@/app/actions/community/quests";
export function QuestPostViewTracker({postId}:{postId:string}){const once=useRef(false);useEffect(()=>{if(once.current)return;once.current=true;const timer=window.setTimeout(()=>void recordQuestPostView(postId),1500);return()=>window.clearTimeout(timer)},[postId]);return null}
