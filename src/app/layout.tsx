import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoKufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-noto-kufi" });

export const metadata: Metadata = {
  metadataBase: new URL('https://irisenergy.com'),
  title: "IRIS Energy | Air-to-Water Heat Pump Solutions",
  description: "Efficient heat-pump solutions for pools, industrial basins, hot water and buildings.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "IRIS Energy",
    description: "Efficient heat-pump solutions for pools, industrial basins, hot water and buildings.",
    url: "https://irisenergy.com",
    siteName: "IRIS Energy",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 412,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${notoKufi.variable} antialiased bg-white text-[#0F172A]`}>
        {children}
      </body>
    </html>
  );
}