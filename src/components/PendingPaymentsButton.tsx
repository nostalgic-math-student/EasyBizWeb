"use client";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { abi2 } from '../contracts/generateTransactionABI';
import { getConnectorClient, getConnections } from '@wagmi/core';
import { config } from '../../config'; // Adjust the path as necessary
import type { ByteArray } from 'viem';
import { formatUnits } from 'viem';

const MiniPayButton: React.FC = () => {
  const [sellerAddress, setSellerAddress] = useState<string>('');
  const [paymentIds, setPaymentIds] = useState<ByteArray[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');
  const contractAddress = '0xdb35b9738C6E58D30d59149910055A561EAA89c6';
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
        abi: abi2,
        functionName: 'getActivePaymentsBySeller',
        args: [sellerAddress],
        client,
      });
  
      console.log('Payment IDs Fetched:', paymentIdsResponse);
      setPaymentIds(paymentIdsResponse);
  
      // Fetch details for each payment ID using the payments mapping
      const paymentDetailsPromises = paymentIdsResponse.map(async (paymentId: ByteArray) => {
        try {
          const details: [string, bigint, string, boolean, string] = await readContract(config,{
            address: contractAddress,
            abi: abi2,
            functionName: 'payments',
            args: [paymentId],
            client,
          });
    
          const [recipient, amount, description, completed, currency] = details;
          const formattedAmount = formatUnits(amount, 18); // Format the amount to Ether (or base unit)
    
          return {
            paymentId,
            recipient,
            amount: formattedAmount,
            description,
            completed,
            currency,
          };
        } catch (err) {
          console.error(`Failed to fetch details for payment ID ${paymentId}`, err);
          return null;
        }
      });
  
      const detailedPayments = await Promise.all(paymentDetailsPromises);
      setPaymentDetails(detailedPayments.filter(Boolean)); // Filter out any null values from failed fetches
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
              <strong className=" justify-center">Payment ID:</strong> <span className="justify-center">{payment.paymentId}</span>
              <strong className=" justify-center">Recipient:</strong> <span className="justify-center">{payment.recipient || 'N/A'}</span>
              <strong className=" justify-center">Amount:</strong> <span className="justify-center">{payment.amount} {payment.currency}</span>
              <strong className=" justify-center">Description:</strong> <span className="justify-center">{payment.completed || 'N/A'}</span>
              <strong className=" justify-center">Completed:</strong> <span>{payment.description ? 'Yes' : 'No'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniPayButton;
