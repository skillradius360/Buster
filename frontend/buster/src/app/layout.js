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

export const metadata = {
  title: "Buster | AI-Powered Deepfake & Content Forensics",
  description:
    "Detect AI-generated images, deepfakes, and manipulated media in seconds. Upload an image or paste a URL — Buster delivers forensic-grade authenticity analysis powered by advanced neural networks.",
  keywords: ["deepfake detection", "AI content detection", "image forensics", "media authenticity", "fake image detector"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
