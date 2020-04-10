const express = require('express');
const { tokenController } = require('../controllers');

const router = express.Router();

router.post('/', tokenController.getNewToken);

module.exports = router;
