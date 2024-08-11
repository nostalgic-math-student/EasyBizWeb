// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { abi as erc20Abi } from '@openzeppelin/contracts/build/contracts/IERC20.json';
import { writeContract, readContract } from 'wagmi/actions';
import { abi2 } from '../contracts/generateTransactionABI';
import { parseUnits, keccak256, stringToBytes } from 'viem';
import { getConnectorClient, getConnections } from '@wagmi/core';
import { config } from '../../config'; // Adjust the path as necessary
import { approveCUSD } from '@/celo/approvecUSD';

const FulfillPaymentButton: React.FC = () => {
  const [paymentId, setPaymentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
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

  // Manejo de aprobación y cumplimiento del pago
  const handleFulfillPayment = async () => {
    try {
      if (!paymentId || !amount) {
        setComment('Please enter both Payment ID and Amount.');
        return;
      }

      const amountInWei = parseUnits(amount, 18);

      // Verificar la asignación actual (allowance)
      const allowance = await readContract(config, {
        address: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B", // Dirección del cUSD
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address, contractAddress],
      });
      console.log(allowance,amountInWei,"measures")
      if (allowance < amountInWei) {
        // Aprobar contrato para gastar cUSD si es necesario
        await approveCUSD(address, amountInWei)
      }
      //Cumplir con el pago
      const response = await writeContract(config, {
        address: contractAddress,
        abi: abi2,
        functionName: 'fulfillPayment',
        args: [paymentId],
        account: address,
      });

      console.log('Payment Fulfilled:', response);
      setComment('Payment Fulfilled Successfully!');
    } catch (error) {
      setComment(`Fulfillment Failed: ${error.toString()}`);
      console.error('Fulfillment Failed:', error);
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
