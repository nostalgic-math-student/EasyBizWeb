"use client"
import { useState, useEffect } from "react";
import Animation from "@/components/Animation";
import { useConnect, useAccount } from "wagmi";
import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export default function HomePage() {

  const { connect } = useConnect()
  const account = useAccount();
  const [Flag, setFlag] = useState("")
  
  useEffect(() => {
    const client = createWalletClient({
      chain: celoAlfajores,
      // chain: celoAlfajores, // For Celo Testnet
      transport: custom(window.ethereum),
    });

  }
, []);

  

  return (
    <main className="relative flex flex-col items-center justify-start bg-gradient-to-b from-[#0D1B2A] from-30% via-[#189ab4] via-40% to-[#B45D00] to-90% text-white min-h-screen">

      {/* Section 1: Animation and Main Heading */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full">
        <div className="z-10 text-center">
          <h1 className="text-shadow text-3xl text-white mb-8">
            Future of Payments occurs{" "}
            <span className="font-extrabold text-[hsl(180,100%,50%)]">
              NOW
            </span>
          </h1>
        </div>
        <div className="absolute inset-0 z-0">
          <Animation />
        </div>
      </section>

      {/* Section 2: Content Block 1 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">Payments made simple with Celo Minipay</h2>
        <p className="text-lg">
          Connect with Celo MiniPay and start paying NOW
        </p>
        <button className="btn btn-secondary">
          Start Payment
        </button>
        { account.address && (
          <>
            <p className="mt-4 text-lg">Connected with address: {account.address}</p>
          </>
          )}

      </section>

      {/* Section 3: Content Block 2 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">CMS Integration</h2>
        <p className="text-lg">
          Your one-stop-only for tracking your business performance 
        </p>
      </section>
    </main>
  );
}
