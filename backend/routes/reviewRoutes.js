import express from 'express';
import { IEM_LIST } from '../../src/data/iemData.js';

const router = express.Router();

let reviewsList = IEM_LIST.map(iem => ({
  id: `rev-${iem.id}`,
  iemId: iem.id,
  iemName: iem.name,
  author: iem.review.author,
  rating: iem.rating,
  verdict: iem.review.verdict,
  pros: iem.review.pros,
  cons: iem.review.cons,
  createdAt: new Date().toISOString()
}));

// GET /api/reviews
router.get('/', (req, res) => {
  const { iemId } = req.query;
  if (iemId) {
    const filtered = reviewsList.filter(r => r.iemId === iemId);
    return res.json({ count: filtered.length, reviews: filtered });
  }
  return res.json({ count: reviewsList.length, reviews: reviewsList });
});

// POST /api/reviews - Add review
router.post('/', (req, res) => {
  const { iemId, rating, verdict, pros, cons, body } = req.body;
  if (!iemId || !rating || !verdict) {
    return res.status(400).json({ error: 'iemId, rating, and verdict are required' });
  }

  const iem = IEM_LIST.find(i => i.id === iemId);
  const newReview = {
    id: `rev-${Date.now()}`,
    iemId,
    iemName: iem ? iem.name : 'Unknown IEM',
    author: req.body.author || 'Audiophile Member',
    rating: parseFloat(rating),
    verdict,
    pros: pros || [],
    cons: cons || [],
    body: body || '',
    createdAt: new Date().toISOString()
  };

  reviewsList.unshift(newReview);
  return res.status(201).json({ message: 'Review published successfully', review: newReview });
});

export default router;
