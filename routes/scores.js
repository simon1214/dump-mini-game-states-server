const express = require('express')
const router = express.Router()

router.get('/scores', (req, res) => {
  res.status(200).send('Scores')
})

router.get('/leaderboard', (req, res) => {
  res.status(200).send('Leaderboard')
})

module.exports = router