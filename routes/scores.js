const express = require('express');

const router = express.Router();
const { scoresController } = require('../controllers');

router.get('/scores', scoresController.getScores);

router.get('/leaderboard', scoresController.getLeaderboard);

module.exports = router;
