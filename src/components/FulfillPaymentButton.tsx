// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { writeContract } from 'wagmi/actions';
import { abi } from '../contracts/generateTransactionABI';
import { parseUnits } from 'viem';
import { getConnectorClient, getConnections } from '@wagmi/core';
import { config } from '../../config'; // Adjust the path as necessary

const FulfillPaymentButton: React.FC = () => {
  const [paymentId, setPaymentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const contractAddress = '0xc7F16a4c321FA2baDA883c10487Ea87Af78afB8e';
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      console.error('No wallet connected');
    } else {
      console.log('Connected address:', address);
    }
  }, [isConnected, address]);

  const handleFulfillPayment = async () => {
    try {
      if (!window.ethereum) {
        console.error('Ethereum provider not found');
        return;
      }

      const amountInWei = parseUnits(amount, 18); // Convert the amount to wei
  
      // Get the client using getConnectorClient
      const connections = getConnections(config);
      const client = await getConnectorClient(config, {
        connector: connections[0]?.connector,
      });

      if (!client) {
        console.error('Client not found');
        return;
      }

      if (!paymentId || !amount) {
        console.error('Payment ID or amount is missing');
        setComment('Please enter both Payment ID and amount.');
        return;
      }

      // Call fulfillPayment function
      const response = await writeContract(config,{
        account: address,
        address: contractAddress,
        abi: abi,
        functionName: 'fulfillPayment',
        args: [paymentId],
        value: amountInWei,
        client,
      });

      console.log('Payment Fulfilled:', response);
      setComment('Payment Fulfilled Successfully!');
    } catch (error) {
      setComment(`Payment Fulfillment Failed: ${error.toString()}`);
      console.error('Payment Fulfillment Failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        className="mb-2 p-2 border border-gray-300 rounded-md text-black w-full max-w-xs"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount to Pay"
        className="mb-2 p-2 border border-gray-300 rounded-md text-black w-full max-w-xs"
      />
      <button
        onClick={handleFulfillPayment}
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 w-full max-w-xs"
      >
        Fulfill Payment
      </button>
      {comment && <p className="mt-4 text-center text-sm text-red-500">{comment}</p>}
    </div>
  );
};

export default FulfillPaymentButton;
