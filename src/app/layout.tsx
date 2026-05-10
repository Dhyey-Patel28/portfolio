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
    default: "Dhyey Patel — Software Developer",
    template: "%s — Dhyey Patel",
  },
  description:
    "Software developer building full-stack tools, data-driven systems, and applied ML projects.",
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
    "Data Systems",
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
  openGraph: {
    title: "Dhyey Patel — Software Developer",
    description:
      "Full-stack tools, data systems, and applied ML projects by Dhyey Patel.",
    url: "https://dhyey-patel.vercel.app",
    siteName: "Dhyey Patel",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dhyey Patel — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhyey Patel — Software Developer",
    description:
      "Full-stack tools, data systems, and applied ML projects by Dhyey Patel.",
    images: ["/opengraph-image"],
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