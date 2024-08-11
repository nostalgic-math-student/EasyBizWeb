"use client"
import React from 'react'
import WalletConnection from '@/celo/WalletConnection'
import { useAccount } from 'wagmi';

function Navbar() {
  const { address, isConnected } = useAccount();
  return (
<div className="min-w-screen flex items-center justify-center navbar bg-base-200 rounded-md p-4 ">
  <div className="flex-1">
      Easy<span className="text-[hsl(180,100%,70%)]">Biz</span>
  </div>
  <div className="flex min-x-4">
   {!isConnected? (<WalletConnection/>) : (address)}
  
  </div>
</div>
  )
}

export default Navbar