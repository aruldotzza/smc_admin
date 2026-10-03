import type { Metadata, Viewport } from "next";
import { manrope, inter, playfair } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singapore Maxicabs | Admin Portal",
  description:
    "Management and operations portal for Singapore Maxicabs - Bookings, Fleets, Drivers, Pricing, and Analytics.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071E3B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#F8F9FA] text-[#071E3B] antialiased">
        {children}
      </body>
    </html>
  );
}
