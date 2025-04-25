import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import { startBirthdayJob } from './scheduler/birthdayJob.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(userRoutes);

// Cron job
startBirthdayJob();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
