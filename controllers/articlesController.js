const { Articles } = require('../models');

const articlesController = {
  getArticles: (req, res) => {
    res.sendStatus(200);
  },
  postArticle: (req, res) => {
    const { title, contents } = req.body;
    const { sub } = req.user;

    Articles.create({
      title,
      contents,
      user_id: sub,
    })
      .then(() => {
        res.status(201).json({ title });
      })
      .catch(() => {
        res.sendStatus(400);
      });
  },
};

module.exports = articlesController;
