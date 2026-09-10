import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuan Kiet Retreat | A quieter stay in Quy Nhon",
  description:
    "A nature-led boutique retreat in Quy Nhon, Gia Lai, Vietnam, with considered rooms, local experiences, and unhurried hospitality.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
