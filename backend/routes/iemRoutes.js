import express from 'express';
import { IEM_LIST, TARGET_CURVES } from '../../src/data/iemData.js';

const router = express.Router();

// GET /api/iems - Get all IEMs with optional filtering
router.get('/', (req, res) => {
  const { search, brand, soundSignature, minPrice, maxPrice } = req.query;
  let results = [...IEM_LIST];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.brand.toLowerCase().includes(q) ||
      i.soundSignature.toLowerCase().includes(q)
    );
  }

  if (brand) {
    results = results.filter(i => i.brand.toLowerCase() === brand.toLowerCase());
  }

  if (soundSignature) {
    results = results.filter(i => i.soundSignature.toLowerCase().includes(soundSignature.toLowerCase()));
  }

  if (minPrice) {
    results = results.filter(i => i.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    results = results.filter(i => i.price <= parseFloat(maxPrice));
  }

  return res.json({ count: results.length, iems: results });
});

// GET /api/iems/targets - Get standard target curves
router.get('/targets', (req, res) => {
  return res.json({ targets: TARGET_CURVES });
});

// GET /api/iems/:id - Get IEM details by ID
router.get('/:id', (req, res) => {
  const item = IEM_LIST.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'IEM not found' });
  }
  return res.json({ iem: item });
});

export default router;
