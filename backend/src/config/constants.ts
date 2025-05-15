import { Address, parseAbi } from 'viem';

export const INFURA_BASE_URL = 'https://mainnet.infura.io/v3';

export type TokenSymbol = 'USDC' | 'LINK';

export interface TokenConfig {
  address: Address;
  decimals: number;
}

export const TOKENS: Record<TokenSymbol, TokenConfig> = {
  USDC: {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6
  },
  LINK: {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18
  }
};

export const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)'
]); 