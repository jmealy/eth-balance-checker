import './App.css'
import ETHAddressForm from './components/ETHAddressForm'
import { useState } from 'react'
import { fetchBalances } from './services/balanceService'
import { Card, CardContent, Typography, Box } from '@mui/material'
import BalanceCard from './components/BalanceCard'
import type { BalanceResponse } from './components/BalanceCard'

function App() {
  const [balances, setBalances] = useState<BalanceResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (address: string) => {
    setLoading(true);
    setError(null);
    setBalances(null);
    try {
      const result = await fetchBalances(address);
      // Ensure result is an array
      setBalances(Array.isArray(result) ? result : [result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balances');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <ETHAddressForm onSubmit={handleSubmit} />
      {loading && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Loading balances...
        </Typography>
      )}
      {error && (
        <Card variant="outlined" sx={{ mt: 2, bgcolor: '#fff3f3' }}>
          <CardContent>
            <Typography color="error">
              {error}
            </Typography>
          </CardContent>
        </Card>
      )}
      {balances && !error && (
        <Box sx={{ mt: 2 }}>
          {balances.map((balanceResponse, idx) => (
            <BalanceCard key={balanceResponse.token + idx} balanceResponse={balanceResponse} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default App
