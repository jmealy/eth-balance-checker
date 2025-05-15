import './App.css'
import AddressInputForm from './components/AddressInputForm'
import { useState } from 'react'
import { fetchBalances } from './services/balanceService'
import { Card, Typography, Box, CircularProgress } from '@mui/material'
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
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      p: 2
    }}>
      <AddressInputForm onSubmit={handleSubmit} />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress sx={{ mt: 2, textAlign: 'center' }} />
        </Box>
      )}
      {error && (
        <Card variant="outlined" sx={{ mt: 2, bgcolor: '#fff3f3' }}>
          <Box sx={{ p: 1 }}>
            <Typography color="error">
              {error}
            </Typography>
          </Box>
        </Card>
      )}
      {balances && !error && (
        <Box>
          {balances.map((balanceResponse, idx) => (
            <BalanceCard key={balanceResponse.token + idx} balanceResponse={balanceResponse} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default App
