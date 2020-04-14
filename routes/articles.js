const express = require('express');

const router = express.Router();
const { articleController } = require('../controllers');

const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

router.get('/', articleController.getArticles);
router.post('/', jwtAuthenticator, articleController.postArticle);
router.post('/delete', articleController.deleteArticle);
router.post('/update', articleController.updateArticle);

module.exports = router;
