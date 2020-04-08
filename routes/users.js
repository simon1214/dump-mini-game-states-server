var express = require('express');
var router = express.Router();

router.post('/signin', (req, res) => {
  res.status(200).send('Signin')
})

router.post('/signup', (req, res) => {
  res.status(200).send('signup')
})

router.post('/signout', (req, res) => {
  res.status(200).send('signout')
})

module.exports = router;
