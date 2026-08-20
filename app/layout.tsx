import type { Metadata } from "next";
import "./globals.css";
import "./workstreams.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Niagara Gutter Systems Hub | WNY Automation",
  description: "A private systems concept prepared for Niagara Gutter by WNY Automation.",
  icons: {
    icon: `${basePath}/niagara-gutter-logo.webp`,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
