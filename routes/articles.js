const express = require('express');

const router = express.Router();
const { articleController } = require('../controllers');

const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

router.get('/', articleController.getArticles);
router.post('/', jwtAuthenticator, articleController.postArticle);
router.delete('/:articleID', articleController.deleteArticle);
router.put('/:articleID', articleController.updateArticle);

module.exports = router;
