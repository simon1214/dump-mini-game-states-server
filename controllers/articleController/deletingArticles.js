const { Articles } = require('../../models');

const deleteArticle = (req, res) => {
  const article_id = req.params.articleID;

  Articles.destroy({ where: { id: article_id } })
    .then(() => {
      res.status(200).send('Success');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

module.exports = { deleteArticle };
