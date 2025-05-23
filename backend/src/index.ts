import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllBalances } from './services/balance';
import { isAddress } from 'viem';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const getBalancesHandler: express.Handler = async (req, res) => {
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({
      error: 'Bad Request',
      details: 'Address query parameter is required'
    });
  }

  if (!isAddress(address)) {
    return res.status(400).json({
      error: 'Bad Request',
      details: 'Invalid Ethereum address format'
    });
  }

  try {
    const balanceData = await getAllBalances(address);
    res.json(balanceData);
  } catch (error) {
    const statusCode = error instanceof Error && error.message.includes('Failed to fetch any balances') ? 404 : 500;
    res.status(statusCode).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch balances',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

app.get('/api/balance', getBalancesHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 