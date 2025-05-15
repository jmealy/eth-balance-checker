import { Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface ETHAddressFormProps {
  onSubmit: (address: string) => void;
}

const isValidETHAddress = (address: string): boolean => {
  // Check if address starts with 0x and is 42 characters long
  if (!address.startsWith('0x') || address.length !== 42) {
    return false;
  }
  
  // Check if the rest of the address contains only valid hex characters
  const hexRegex = /^0x[0-9a-fA-F]{40}$/;
  return hexRegex.test(address);
};

const ETHAddressForm = ({ onSubmit }: ETHAddressFormProps) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!address.trim()) {
      setError('ETH address is required');
      return;
    }

    if (!isValidETHAddress(address)) {
      setError('Please enter a valid ETH address.');
      return;
    }
    
    setError('');
    onSubmit(address);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Enter ETH Address
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            label="ETH Address"
            variant="outlined"
            placeholder="0x..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (error) setError('');
            }}
            error={!!error}
            helperText={error}
            inputProps={{
              'aria-label': 'Ethereum address input',
            }}
            sx={{ mb: 2 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            aria-label="Submit ETH address"
          >
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ETHAddressForm; 