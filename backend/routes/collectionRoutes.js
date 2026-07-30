import express from 'express';
import { IEM_LIST } from '../../src/data/iemData.js';

const router = express.Router();

let userCollections = [
  { id: 'col-1', userId: 1, iemId: 'monarch-mk3', status: 'owned', rating: 4.9, notes: 'Twin IMPACT2 subbass is unbelievable' },
  { id: 'col-2', userId: 1, iemId: 'ie600', status: 'owned', rating: 4.8, notes: 'Zirconium shell ergonomic marvel' },
  { id: 'col-3', userId: 1, iemId: 'u12t', status: 'wishlist', rating: 5.0, notes: 'Goal flagship IEM for retirement' }
];

// GET /api/collections
router.get('/', (req, res) => {
  const { status } = req.query;
  let items = userCollections.map(col => {
    const iem = IEM_LIST.find(i => i.id === col.iemId);
    return { ...col, iem };
  });

  if (status) {
    items = items.filter(i => i.status === status);
  }

  return res.json({ count: items.length, items });
});

// POST /api/collections/toggle
router.post('/toggle', (req, res) => {
  const { iemId, status } = req.body;
  if (!iemId || !status) {
    return res.status(400).json({ error: 'iemId and status are required' });
  }

  const existingIdx = userCollections.findIndex(c => c.iemId === iemId && c.status === status);
  if (existingIdx >= 0) {
    userCollections.splice(existingIdx, 1);
    return res.json({ message: 'Item removed from collection', action: 'removed' });
  } else {
    const newItem = {
      id: `col-${Date.now()}`,
      userId: 1,
      iemId,
      status,
      rating: 4.5,
      notes: 'Added via Revera Workstation OS'
    };
    userCollections.push(newItem);
    return res.json({ message: 'Item added to collection', action: 'added', item: newItem });
  }
});

export default router;
