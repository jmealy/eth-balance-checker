import { Card, CardContent, Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';

const ETHAddressForm = () => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted ETH Address:', address);
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
            onChange={(e) => setAddress(e.target.value)}
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