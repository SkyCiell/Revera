import express from 'express';
import { IEM_LIST } from '../../src/data/iemData.js';

const router = express.Router();

// GET /api/stats
router.get('/', (req, res) => {
  const totalIems = IEM_LIST.length;
  const avgPrice = Math.round(IEM_LIST.reduce((acc, curr) => acc + curr.price, 0) / totalIems);
  const topRated = IEM_LIST.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev), IEM_LIST[0]);

  const driverBreakdown = {
    tribrid: IEM_LIST.filter(i => i.driverTopology.includes('EST')).length,
    hybrid: IEM_LIST.filter(i => i.driverTopology.includes('Hybrid') || (i.driverTopology.includes('DD') && i.driverTopology.includes('BA'))).length,
    dynamic: IEM_LIST.filter(i => i.driverTopology.includes('TrueResponse') || i.driverTopology.includes('Dynamic')).length,
    baArray: IEM_LIST.filter(i => i.driverTopology.includes('Balanced Armatures')).length
  };

  return res.json({
    totalIems,
    avgPrice,
    topRated,
    driverBreakdown,
    systemStatus: 'ONLINE - 32-Bit / 384kHz DSP ACTIVE',
    database: 'REVERA MYSQL / MEMORY SYNCED'
  });
});

export default router;
