const Articles = require('../models').Articles

const articlesController = {
  getArticles : (req, res) => {
    res.sendStatus(200)
  },
  postArticle : (req, res) => {
    const {title, contents} = req.body
    const {sub} = req.user

    Articles
      .create({
        title,
        contents,
        user_id: sub
      }).then(() => {
        res.status(201).json({title})
      }).catch(err => {
        res.sendStatus(403)
      })
  }
}

module.exports = articlesController