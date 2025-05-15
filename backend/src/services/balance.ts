import { createPublicClient, http, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

// Initialize viem client
const client = createPublicClient({
  chain: mainnet,
  transport: http()
});

interface BalanceResponse {
  address: `0x${string}`;
  balance: number;
}

export const getEthereumBalance = async (address: `0x${string}`): Promise<BalanceResponse> => {
  try {
    const balance = await client.getBalance({ address });
    
    return {
      address,
      balance: Number(formatEther(balance))
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch balance');
  }
}; 