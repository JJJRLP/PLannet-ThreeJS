import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Three.js UX Showcase | By Skylos Solutions",
  description: "Discover how immersive 3D elements can transform your web presence. A demonstration of Three.js scroll-driven animations by Skylos Solutions - AI & Blockchain innovators.",
  keywords: ["Three.js", "WebGL", "3D Web", "GSAP", "Scroll Animation", "Skylos Solutions", "AI", "Blockchain"],
  authors: [{ name: "Skylos Solutions", url: "https://skylos.solutions" }],
  openGraph: {
    title: "Three.js UX Showcase | By Skylos Solutions",
    description: "Discover how immersive 3D elements can transform your web presence.",
    url: "https://skylos.solutions",
    siteName: "Skylos Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
