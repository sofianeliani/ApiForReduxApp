const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;
const Role = db.role;
const Article = db.article;


exports.create = (req, res) => {
    const article = new Article({
        categorie: req.body.categorie,
        name: req.body.name,
        content: req.body.content
    });

    res.article = article;

    return res.status(200).send("article was created..")
}


exports.getArticleById =  async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: "Cannot find article..." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.article = article;
  next();
};