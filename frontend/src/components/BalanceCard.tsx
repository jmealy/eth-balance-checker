import { Card, Typography, Box } from '@mui/material';

export type BalanceResponse = {
  token: string;
  balance: number | string;
  tokenName?: string;
};

interface BalanceCardProps {
  balanceResponse: BalanceResponse;
}

function formatBalance(value: number | string): string {
  const numValue = typeof value === 'string' ? Number(value) : value;

  if (numValue === 0) return "0";
  
  // Split number into whole and decimal parts
  const [wholePart, decimalPart] = numValue.toString().split('.');

  // Format whole number part with thousands separators
  const formattedWhole = Number(wholePart).toLocaleString('en-US');

  // If no decimal part, return just the whole number
  if (!decimalPart) return formattedWhole;

  // Format decimal part to 4 significant digits
  const decimalNum = Number(`0.${decimalPart}`);
  const formattedDecimal = decimalNum.toPrecision(4)
    .replace('0.', '')
    .replace(/\.?0+$/, '');

  return `${formattedWhole}.${formattedDecimal}`;
}


const BalanceCard = ({ balanceResponse }: BalanceCardProps) => {
  const { token, balance } = balanceResponse;

  const formattedBalance = formatBalance(balance);

  return (
    <Card
      sx={{ mb: 1 }}
      tabIndex={0}
      aria-label={`Balance card for ${token}`}
      role="region"
      variant="outlined"
    >
      <Box sx={{ p: 2 }}>
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
      </Box>
    </Card>
  );
};

export default BalanceCard; 