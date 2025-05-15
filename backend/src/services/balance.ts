import { createPublicClient, http, formatEther, formatUnits, Address, parseAbi, isAddress } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http()
});

type TokenSymbol = 'USDC' | 'LINK';

interface TokenConfig {
  address: Address;
  decimals: number;
}

const TOKENS: Record<TokenSymbol, TokenConfig> = {
  USDC: {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6
  },
  LINK: {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18
  }
};

const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)'
]);

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