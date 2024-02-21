import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Charity",
  description:
    "Charity platform makes raising funds to easy and transparent using blockchain.",
  url: "https://charity-next-dapp.vercel.app",
  icons: [
    "https://res.cloudinary.com/dw6wav4jg/image/upload/v1708533691/android-chrome-512x512_lmq9mv.png",
  ],
};

export const config = defaultWagmiConfig({
  chains: [sepolia],
  projectId,
  metadata,
  ssr: true,
  enableWalletConnect: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [walletConnect({ projectId })],
  transports: { [sepolia.id]: http() },
});
