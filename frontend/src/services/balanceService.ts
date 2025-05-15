interface BalanceResponse {
  balance: string;
  address: string;
  token: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Fetches the ETH balance for a given address
 * @param address - The Ethereum address to check balance for
 * @returns Promise containing the balance response
 * @throws Error if the API call fails
 */
export const fetchBalances = async (address: string): Promise<BalanceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/balance?address=${address}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ETH balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 