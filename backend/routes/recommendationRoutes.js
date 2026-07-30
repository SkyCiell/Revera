import express from 'express';
import { IEM_LIST } from '../../src/data/iemData.js';

const router = express.Router();

// POST /api/recommendations/synthesize
router.post('/synthesize', (req, res) => {
  const { bass, vocal, treble, stage, prompt } = req.body;

  const targetBass = bass || 75;
  const targetVocal = vocal || 75;
  const targetTreble = treble || 75;
  const targetStage = stage || 75;

  const matches = IEM_LIST.map(iem => {
    const bassDiff = Math.abs(iem.scores.technicalities * 0.9 - targetBass);
    const vocalDiff = Math.abs(iem.scores.timbre - targetVocal);
    const trebleDiff = Math.abs(iem.scores.resolution - targetTreble);
    const stageDiff = Math.abs(iem.scores.soundstage - targetStage);
    const avgDiff = (bassDiff + vocalDiff + trebleDiff + stageDiff) / 4;
    const matchPercentage = Math.max(60, Math.min(99, Math.round(100 - avgDiff)));

    return { ...iem, matchScore: matchPercentage };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return res.json({
    query: { bass: targetBass, vocal: targetVocal, treble: targetTreble, stage: targetStage, prompt },
    matches
  });
});

export default router;
