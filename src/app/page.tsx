"use client";
import { useState, useEffect } from "react";
import Animation from "@/components/Animation";
import { useConnect, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";
import MiniPayButton from "@/components/MiniPayButton";
import PendingPayButton from "@/components/PendingPaymentsButton";

export default function HomePage() {
  const { connect } = useConnect();
  const router = useRouter();
  const { address } = useAccount();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("Ethereum object:", window.ethereum);

      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      setClient(client);
    } else {
      console.error("MetaMask or another Ethereum provider is not installed.");
    }
  }, []);

  useEffect(() => {
    if (address) {
      console.log("Account address:", address);
    } else {
      console.error("Account address is undefined or missing");
    }
  }, [address]);

  return (
    <main className="relative flex flex-col items-center justify-start bg-gradient-to-b from-[#0D1B2A] from-30% via-[#189ab4] via-40% to-[#B45D00] to-90% text-white min-h-screen">
      {/* Section 1: Animation and Main Heading */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full">
        <div className="z-10 text-center">
          <h1 className="text-shadow text-3xl text-white mb-8">
            Future of Payments occurs{" "}
            <span className="font-extrabold text-[hsl(180,100%,50%)]">NOW</span>
          </h1>
        </div>
        <div className="absolute inset-0 z-0">
          <Animation />
        </div>
      </section>

      {/* Section 2: Content Block 1 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">Payments made simple with Celo Minipay</h2>
        <p className="text-lg">Connect with Celo MiniPay and start paying NOW</p>
        <MiniPayButton />
        {address && (
          <>
            <p className="mt-4 text-lg">Connected with address: {address}</p>
          </>
        )}
      </section>

      {/* Section 3: Content Block 2 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">Check your pending payments!</h2>
        <p className="text-lg">Your one-stop-only for tracking your business performance</p>
        <PendingPayButton/>
      </section>
    </main>
  );
}
