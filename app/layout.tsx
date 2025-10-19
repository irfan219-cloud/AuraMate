import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuraMate - Your Emotional AI Companion",
  description: "An emotionally intelligent AI that feels you before it speaks to you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-aura-pink/20 via-aura-lavender/20 to-aura-blue/20 min-h-screen">
        {children}
      </body>
    </html>
  );
}
