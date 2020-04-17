const { Articles } = require('../../models');

const updateArticle = (req, res) => {
  const article_id = req.params.articleID;
  const {
    dislikes, likes, title, contents,
  } = req.body;

  Articles.update(
    {
      title, contents, likes, dislikes,
    },
    {
      where: {
        id: article_id,
      },
    },
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
      res.sendStatus(400);
    });
};

module.exports = { updateArticle };
