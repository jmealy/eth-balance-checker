import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getEthereumBalance } from './services/balance';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const getBalancesHandler: express.Handler = async (req, res) => {
  const { address } = req.body;
  
  try {
    const balanceData = await getEthereumBalance(address);
    res.json(balanceData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch balance',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

app.post('/api/balance', getBalancesHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 