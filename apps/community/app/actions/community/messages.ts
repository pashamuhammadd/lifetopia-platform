"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";
export type MessageActionResult = { ok: boolean; message: string; conversationId?: string };
export async function startDirectConversation(formData: FormData): Promise<MessageActionResult> {
  const username = String(formData.get("username") ?? "")
    .trim()
    .replace(/^@/, "");
  if (!/^[a-zA-Z0-9_]{3,32}$/.test(username))
    return { ok: false, message: "Enter a valid Lifetopia username." };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("start_community_direct_conversation", {
    p_username: username,
  });
  if (error) {
    if (error.message.includes("cannot_message_self"))
      return { ok: false, message: "You cannot message your own account." };
    if (error.message.includes("profile_not_found"))
      return { ok: false, message: "That Lifetopia username was not found." };
    if (error.message.includes("restricted"))
      return { ok: false, message: "This account cannot start messages while restricted." };
    return { ok: false, message: "The conversation could not be started." };
  }
  revalidatePath("/messages");
  return { ok: true, message: "Conversation ready.", conversationId: String(data) };
}
export async function sendDirectMessage(
  conversationId: string,
  formData: FormData,
): Promise<MessageActionResult> {
  if (!/^[0-9a-f-]{36}$/i.test(conversationId))
    return { ok: false, message: "This conversation is invalid." };
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 1 || body.length > 2000)
    return { ok: false, message: "Messages must contain 1–2,000 characters." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("send_community_direct_message", {
    p_conversation_id: conversationId,
    p_body: body,
  });
  if (error)
    return {
      ok: false,
      message: error.message.includes("restricted")
        ? "Messaging is unavailable while this account is restricted."
        : "The message could not be sent.",
    };
  revalidatePath(`/messages/${conversationId}`);
  revalidatePath("/messages");
  return { ok: true, message: "Sent." };
}
