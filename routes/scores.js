const express = require('express');
const { scoreController } = require('../controllers');
const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

const router = express.Router();

router.get('/scores', jwtAuthenticator, scoreController.getUserScores);
router.post('/scores', jwtAuthenticator, scoreController.postUserScores);
router.post('/leaderboard', scoreController.getLeaderboard);

module.exports = router;
