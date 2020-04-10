const express = require('express');
const { scoreController } = require('../controllers');
const router = express.Router();

router.get('/scores', scoreController.getUserScores);
router.post('/scores', scoreController.postUserScores);
router.get('/leaderboard', scoreController.getLeaderboard);

module.exports = router;
