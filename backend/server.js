import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import iemRoutes from './routes/iemRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/iems', iemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  return res.json({ status: 'OK', system: 'Revera Audiophile Express Server', timestamp: new Date() });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[Revera Server] REST API running on http://localhost:${PORT}`);
});
