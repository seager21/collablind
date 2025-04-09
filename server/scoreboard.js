const express = require('express')
const router = express.Router()

let scoreboard = []

router.get('/scoreboard', (req, res) => {
  res.json(scoreboard.sort((a, b) => b.score - a.score).slice(0, 10)) // Top 10 scores
})

router.post('/scoreboard', (req, res) => {
  const { playerName, score } = req.body
  if (playerName && score >= 0) {
    scoreboard.push({ id: Date.now(), playerName, score })
    res.status(201).send('Score added')
  } else {
    res.status(400).send('Invalid data')
  }
})

module.exports = router
