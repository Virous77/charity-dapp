import WalletModal from "@/lib/wagmi/wallet-modal";
import { WalletOptions } from "@/lib/wagmi/wallet-options";

const HomePage = () => {
  return (
    <div>
      <WalletOptions />
      <WalletModal />
    </div>
  );
};

export default HomePage;
