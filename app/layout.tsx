import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuan Kiet Retreat | A quieter stay in Da Lat",
  description:
    "A nature-led boutique retreat in Da Lat, Vietnam, with considered rooms, local experiences, and unhurried hospitality.",
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
