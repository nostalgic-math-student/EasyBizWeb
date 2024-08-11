"use client";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { abi } from '../contracts/generateTransactionABI';
import { getConnectorClient, getConnections } from '@wagmi/core';
import { config } from '../../config'; // Adjust the path as necessary
import { ByteArray, Sha256Hash } from 'viem';

interface Payment {
    recipient: string;
    amount: bigint;
    description: string;
    completed: boolean;
  }
  

const MiniPayButton: React.FC = () => {
  const [sellerAddress, setSellerAddress] = useState<string>('');
  const [paymentIds, setPaymentIds] = useState<ByteArray[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<any[]>([]); // Store the detailed payment data
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

  const handleCheckPayments = async () => {
    try {
      if (!window.ethereum) {
        console.error('Ethereum provider not found');
        return;
      }
  
      const connections = getConnections(config);
      const client = await getConnectorClient(config, {
        connector: connections[0]?.connector,
      });
  
      if (!client) {
        console.error('Client not found');
        return;
      }
  
      if (!sellerAddress) {
        console.error('No seller address provided');
        setComment('Please enter a seller address.');
        return;
      }
  
      // Fetch active payment IDs
      const paymentIdsResponse: ByteArray[] = await readContract(config,{
        address: contractAddress,
        abi: abi,
        functionName: 'getActivePaymentsBySeller',
        args: [sellerAddress],
        client,
      });
  
      console.log('Payment IDs Fetched:', paymentIdsResponse);
      setPaymentIds(paymentIdsResponse);
  
      // Fetch details for each payment ID using the payments mapping
      const paymentDetailsPromises = paymentIdsResponse.map(async (paymentId: ByteArray) => {
        const details: [string, bigint, string, boolean] = await readContract(config,{
          address: contractAddress,
          abi: abi,
          functionName: 'payments',
          args: [paymentId],
          client,
        });
  
        const [recipient, amount, description, completed] = details;
  
        return {
          paymentId,
          recipient,
          amount,
          description,
          completed,
        };
      });
  
      const detailedPayments = await Promise.all(paymentDetailsPromises);
      setPaymentDetails(detailedPayments);
      setComment(`Payments for seller ${sellerAddress} fetched successfully!`);
    } catch (error) {
      setComment(`${error.toString()}`);
      console.error('Failed to fetch payments:', error);
    }
  };
  
  return (
    <div className="flex flex-col items-center p-4 max-w-full justify-center">
      <input
        type="text"
        value={sellerAddress}
        onChange={(e) => setSellerAddress(e.target.value)}
        placeholder="Enter Seller Address"
        className="mb-2 p-2 border border-gray-300 rounded-md text-black w-full max-w-xs"
      />
      <button
        onClick={handleCheckPayments}
        className="bg-blue-500 text-black p-2 rounded-md hover:bg-blue-700 w-full max-w-xs"
      >
        Check Active Payments
      </button>
      {comment && <p className="mt-4 text-center text-sm text-red-500">{comment}</p>}
      <ul className="mt-4 w-full max-w-md">
        {paymentDetails.map((payment, index) => (
          <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md text-black bg-white overflow-hidden text-ellipsis">
            <div className="flex flex-col items-start">
              <strong className="truncate w-full">Payment ID:</strong> <span className="truncate">{payment.paymentId}</span>
              <strong className="truncate w-full">Recipient:</strong> <span className="truncate">{payment.recipient || 'N/A'}</span>
              <strong className="truncate w-full">Amount:</strong> <span className="truncate">{payment.amount.toString()} wei</span>
              <strong className="truncate w-full">Description:</strong> <span className="truncate">{payment.description || 'N/A'}</span>
              <strong className="truncate w-full">Completed:</strong> <span>{payment.completed ? 'Yes' : 'No'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniPayButton;
