import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WagmiProviderComp from "@/lib/wagmi/wagmi-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Charity",
  description: "Always be giving back to the community.",
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiProviderComp>
            {children}
            <Toaster />
          </WagmiProviderComp>
        </ThemeProvider>
      </body>
    </html>
  );
}
