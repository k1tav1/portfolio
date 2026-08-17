import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
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
  title: "DERICK KITAVI | Software Engineer | Cloud & Intelligent Systems",
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
  ],
  authors: [{ name: "Derick Kitavi" }],
  openGraph: {
    title: "DERICK KITAVI | Software Engineer | Cloud & Intelligent Systems",
    description:
      "Building intelligent systems from Nairobi. Software • Cloud & DevOps • AI Agents. Check out Kaya, Flood Detection, Mradi wa Ardhi.",
    url: "https://github.com/k1tav1",
    siteName: "Derick Kitavi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DERICK KITAVI | Software Engineer",
    description: "Software Engineer | Cloud & Intelligent Systems — Nairobi, Kenya",
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
      </body>
    </html>
  );
}
