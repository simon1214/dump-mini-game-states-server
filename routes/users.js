const express = require('express');

const router = express.Router();
const { userControllers } = require('../controllers');

router.post('/signin', userControllers.signin);
router.post('/signup', userControllers.signup);
router.post('/signout', userControllers.signout);
router.post('/checkID', userControllers.checkDuplicateID);
router.post('/checknickname', userControllers.checkDuplicateNickname);

module.exports = router;
