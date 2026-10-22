import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhyey-patel.vercel.app"),
  title: {
    default: "Dhyey Patel — Software Engineer",
    template: "%s — Dhyey Patel",
  },
  description:
    "Software engineer building production web applications at Eastern Michigan University, with prior Givaudan experience and accepted IEEE research in applied machine learning. Seeking full-time roles after Spring 2027.",
  authors: [{ name: "Dhyey Patel" }],
  creator: "Dhyey Patel",
  keywords: [
    "Dhyey Patel",
    "Software Developer",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Machine Learning Research",
    "Machine Learning",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  // Preview images come from app/opengraph-image.tsx and app/twitter-image.tsx.
  openGraph: {
    title: "Dhyey Patel — Software Engineer",
    description:
      "Production web applications at Eastern Michigan University, internal tools at Givaudan, and accepted IEEE research in applied machine learning.",
    url: "https://dhyey-patel.vercel.app",
    siteName: "Dhyey Patel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhyey Patel — Software Engineer",
    description:
      "Production web applications at Eastern Michigan University, internal tools at Givaudan, and accepted IEEE research in applied machine learning.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}