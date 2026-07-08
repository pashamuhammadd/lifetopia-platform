import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://community.lifetopiaworld.io"),
  title: {
    default: "Lifetopia Community",
    template: "%s | Lifetopia Community",
  },
  description:
    "A cozy social hub for Lifetopians to connect, complete community quests, and grow their identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}