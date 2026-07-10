import type { Metadata } from "next";
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lifetopia World Grant Portal",
  description:
    "Grant and investor portal for Lifetopia World, a cozy fantasy life-sim and social sandbox platform powered by Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-['Baloo_2']">{children}</body>
    </html>
  );
}