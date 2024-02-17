"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useWeb3ModalTheme } from "@web3modal/wagmi/react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setThemeMode } = useWeb3ModalTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="w-9 h-9 flex items-center justify-center bg-default-100 hover:bg-default-200 cursor-pointer"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        setThemeMode(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <Sun size={20} data-testid="sun" />
      ) : (
        <Moon size={20} data-testid="moon" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
