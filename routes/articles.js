const express = require('express');

const router = express.Router();
const { articlesController } = require('../controllers');

const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

router.get('/', articlesController.getArticles);
router.post('/', jwtAuthenticator, articlesController.postArticle);

module.exports = router;
