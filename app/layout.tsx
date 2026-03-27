import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Lundsten | Documentary and Street Photography",
  description:
    "Documentary and street photography shaped around human stories, editorial pacing, and nonprofit storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
