import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './connectDB.js';
import logRouter from './log.router.js';

const app = express();
const port = process.env.port || 8000;

dotenv.config();
app.use(cors({
  credentials: true,
  origin: ["https://attendancetracker-six.vercel.app",
           "https://attendancetracker.co.in",
    "https://logs-meter.vercel.app"
    

  ],
}));
app.use(express.json());
app.use('/', logRouter);
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server failed to start", err);
    process.exit(1);
  }
}

startServer();
