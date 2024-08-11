// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { writeContract } from 'wagmi/actions';
import { abi as erc20Abi } from '@openzeppelin/contracts/build/contracts/IERC20.json';
import config from 'config';
import { use } from 'react';

export const approveCUSD = async (userAddress:string, amountInWei:string) => {
  try {
    console.log("userAddress",userAddress)
    const response = await writeContract(config,{
      address: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B", // Address of the cUSD token contract
      abi: erc20Abi,
      functionName: 'approve',
      args: ["0xdb35b9738C6E58D30d59149910055A561EAA89c6", amountInWei],
      account: userAddress, // The user's address
    });
    console.log('Approval successful:', response);
  } catch (error) {
    console.error('Approval failed:', error);
  }
};
