import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const getBalancesHandler: express.Handler = (req, res) => {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Please provide a string message in the request body' });
    return;
  }

  res.json({ message });
};

app.post('/api/balance', getBalancesHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 