import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

export type BalanceResponse = {
  token: string;
  balance: number | string;
  tokenName?: string;
};

interface BalanceCardProps {
  balanceResponse: BalanceResponse;
}

const BalanceCard = ({ balanceResponse }: BalanceCardProps) => {
  const { token, balance, tokenName } = balanceResponse;

  // Format balance with commas and up to 8 decimals
  const formattedBalance =
    typeof balance === 'number'
      ? balance.toLocaleString(undefined, { maximumFractionDigits: 8 })
      : Number(balance).toLocaleString(undefined, { maximumFractionDigits: 8 });

  return (
    <Card
      sx={{ mb: 1 }}
      tabIndex={0}
      aria-label={`Balance card for ${token}`}
      role="region"
      variant="outlined"
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            {token}
          </Typography>
        <Typography
          fontWeight={700}
          aria-label={`Balance: ${formattedBalance}`}
        >
          {formattedBalance}
        </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BalanceCard; 