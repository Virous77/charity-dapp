import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WagmiProviderComp from "@/lib/wagmi/wagmi-provider";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/lib/wagmi/config";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/common/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Charity",
  description: "Always be giving back to the community.",
};

export const initialState = () => {
  return cookieToInitialState(config, headers().get("cookie"));
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiProviderComp initialState={initialState()}>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </WagmiProviderComp>
        </ThemeProvider>
      </body>
    </html>
  );
}
