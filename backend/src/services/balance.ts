import { createPublicClient, http, formatEther, formatUnits, Address, isAddress } from 'viem';
import { mainnet } from 'viem/chains';
import dotenv from 'dotenv';
import { INFURA_BASE_URL, TOKENS, TokenSymbol, ERC20_ABI } from '../config/constants';

// Load environment variables
dotenv.config();

const INFURA_TOKEN = process.env.INFURA_TOKEN || '';

if (!INFURA_TOKEN) {
  throw new Error('INFURA_TOKEN is not set in environment variables');
}

const ETH_RPC_URL = `${INFURA_BASE_URL}/${INFURA_TOKEN}`;

const client = createPublicClient({
  chain: mainnet,
  transport: http(ETH_RPC_URL)
});

interface BalanceResponse {
  address: Address;
  balance: number;
  token: TokenSymbol | 'ETH';
}

const getEthereumBalance = async (address: Address): Promise<BalanceResponse> => {
  try {
    const balance = await client.getBalance({ address });
    return {
      address,
      balance: Number(formatEther(balance)),
      token: 'ETH'
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch ETH balance');
  }
};

const getERC20Balance = async (
  address: Address,
  tokenSymbol: TokenSymbol
): Promise<BalanceResponse> => {
  const token = TOKENS[tokenSymbol];
  
  try {
    const balance = await client.readContract({
      address: token.address,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [address]
    });

    return {
      address,
      balance: Number(formatUnits(balance, token.decimals)),
      token: tokenSymbol
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Failed to fetch ${tokenSymbol} balance`);
  }
};

export const getAllBalances = async (address: Address): Promise<BalanceResponse[]> => {
  const balancePromises = [
    getEthereumBalance(address),
    getERC20Balance(address, 'USDC'),
    getERC20Balance(address, 'LINK')
  ];

  const results = await Promise.allSettled(balancePromises);
  
  const successfulResults = results
    .filter((result): result is PromiseFulfilledResult<BalanceResponse> => 
      result.status === 'fulfilled'
    )
    .map(result => result.value);

  if (successfulResults.length === 0) {
    throw new Error('Failed to fetch any balances. Please check the address and try again.');
  }

  return successfulResults;
}; 