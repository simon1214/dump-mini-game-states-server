const { getArticles, postArticle } = require('./basicArticleFunctions');
const { updateArticle } = require('./updatingArticles');
const { deleteArticle } = require('./deletingArticles');

module.exports = {
  getArticles,
  postArticle,
  updateArticle,
  deleteArticle,
};
