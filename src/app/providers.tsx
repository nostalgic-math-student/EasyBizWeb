"use client";
import React, {useEffect, useState} from "react";
import { WagmiProvider } from "wagmi";
import { config } from "config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum?.isMiniPay) {
      setIsMiniPay(true);
    }
    console.log("minipay_", isMiniPay)
  }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div>
            si
        {isMiniPay? "true" : "nel"}
        </div>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
