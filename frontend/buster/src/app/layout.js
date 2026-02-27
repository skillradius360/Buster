import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Buster | AI-Powered Deepfake & Content Forensics",
  description:
    "Detect AI-generated images, deepfakes, and manipulated media in seconds. Paste any link — Buster delivers forensic-grade authenticity analysis powered by advanced neural networks.",
  keywords: ["deepfake detection", "AI content detection", "image forensics", "media authenticity", "fake image detector"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
