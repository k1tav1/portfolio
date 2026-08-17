import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-k1tav1.vercel.app"),
  title: {
    default: "DERICK KITAVI | Software Engineer | Cloud & Intelligent Systems",
    template: "%s | Derick Kitavi",
  },
  description:
    "I build intelligent, efficient and adaptable software systems that solve real-world problems and improve organizational efficiency. BSc Computer Science, MMU. AWS/IBM/Oracle certified. Based in Nairobi, Kenya.",
  keywords: [
    "Derick Kitavi",
    "Software Engineer",
    "Cloud Engineer",
    "Kenya",
    "Nairobi",
    "Full-Stack Developer",
    "AI Engineer",
    "Portfolio",
    "Next.js",
    "Kaya",
    "Flood Detection",
    "Mradi wa Ardhi",
    "Flutter",
    "React",
    "Python",
  ],
  authors: [{ name: "Derick Kitavi", url: "https://github.com/k1tav1" }],
  creator: "Derick Kitavi",
  openGraph: {
    title: "DERICK KITAVI | Software Engineer | Cloud & Intelligent Systems",
    description:
      "Building intelligent systems from Nairobi. Software • Cloud & DevOps • AI Agents. Projects: Kaya fintech, Flood Detection, Mradi wa Ardhi. Open to internships, remote, contract.",
    url: "https://portfolio-k1tav1.vercel.app",
    siteName: "Derick Kitavi Portfolio",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "DERICK KITAVI | Software Engineer | Cloud & Intelligent Systems",
    description: "Software Engineer | Cloud & Intelligent Systems — Nairobi, Kenya. Building Kaya, Flood Detection, Mradi wa Ardhi.",
    creator: "@k1tav1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Add google verification after Search Console setup
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050507] text-white selection:bg-[#8B5CF6]/30 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
