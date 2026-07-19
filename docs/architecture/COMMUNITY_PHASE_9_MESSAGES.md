# Community Phase 9 — Messages

Messages v1 is authenticated, private, one-to-one text messaging. It provides a real inbox, conversation creation by Lifetopia username, conversation threads, send, read state, and unread badges.

## Security and scope

- A conversation has one canonical unique participant pair; self-messaging is rejected.
- Tables are protected with forced RLS and are readable only by conversation participants.
- Inserts are available only through authenticated RPCs.
- Active community restrictions prevent starting or sending messages.
- Text is trimmed and limited to 1–2,000 characters.
- Opening a thread marks its available messages read.
- v1 is request/refresh based, not real-time.
- Attachments, voice/video, typing indicators, presence, delivery receipts, group chat, encryption claims, deletion, and editing are intentionally absent.

## Install

1. Run `community-9-preflight.sql` and expect 7 passed.
2. Run `community-9-messages.sql` and expect success/no rows.
3. Run `community-9-verify.sql` and expect 16 passed.

```powershell
node scripts/verify-community-phase-9.mjs
pnpm --filter community check-types
pnpm --filter community build
```

## Manual acceptance

- Guest access to `/messages` requires authentication.
- Account A starts a conversation using account B's exact username.
- Starting a conversation with yourself or an unknown username is rejected.
- A sends B a text message; B sees one unread badge and the inbox preview.
- B opens the thread; the unread state clears after refresh.
- A third account cannot read or send into the conversation UUID.
- A restricted account cannot start or send messages.
- Empty and over-2,000-character messages are rejected.
- Mobile inbox and bubbles have no horizontal overflow; composer remains above bottom navigation.
