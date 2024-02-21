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
import { commonMetaData } from "@/utils/utils";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const metaData = commonMetaData({
    name: "Charity",
    desc: "Always be giving back to the community. Charity is key. Charity makes it easy for you to get started and be full transparent with your donors. Wagmi",
    image:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1708533691/android-chrome-512x512_lmq9mv.png",
    url: "/",
  });
  return {
    ...metaData,
  };
}

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
          defaultTheme="dark"
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
