# Ethereum Balance Checker

A full-stack application that allows users to check Ethereum token balances for any given address. Built with React, TypeScript, and Express.

## Project Structure

```
.
├── frontend/          # React frontend application
└── backend/          # Express backend server
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory from the example given. Add your infura token.

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:5173`

## Development

- Backend development server runs with hot-reload enabled
- Frontend development server includes hot module replacement
- TypeScript compilation and type checking is enabled for both frontend and backend

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - MUI
  - Vite

- Backend:
  - Express
  - TypeScript
  - Viem (Ethereum interaction)
  - dotenv
  