const express = require('express');

const router = express.Router();
const { userControllers: userController } = require('../controllers');

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/signout', userController.signout);
router.post('/checkID', userController.checkDuplicateID);
router.post('/checknickname', userController.checkDuplicateNickname);

module.exports = router;
