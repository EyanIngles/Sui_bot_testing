// suiClient.js (or any appropriate file)
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

// Initialize the Sui provider
const rpcUrl = getFullnodeUrl('mainnet');
 
// create a client connected to devnet
const provider = new SuiClient({ url: rpcUrl });

/**
 * Get balance for a given Sui wallet address.
 * @param {string} address - The Sui wallet address to query.
 * @returns {Promise<number>} - The total balance in SUI.
 */
   export const getBalance = async (address) => {
  try {
    const stringAddress = address.toString()
    const balance = await provider.getBalance({ owner: stringAddress });
    console.log(`Wallet Balance: ${balance.totalBalance} SUI`);
    return balance.totalBalance; // Return the total balance
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw new Error("Failed to fetch balance. Please try again.");
  }
};
