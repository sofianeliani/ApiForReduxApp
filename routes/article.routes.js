const { authJwt } = require('../middlewares');
const controller = require('../controllers/article.controller');
const Article = require('../models/article.model');
const cors = require('cors');

module.exports = function(app) {
    app.options("*", cors());
    app.get("/api/articles/:id", getArticle, (req, res) => {
        res.json(res.article);
      });
  
    app.get("/api/articles", async (req, res) => {
        const article = await Article.find();
        
        res.json(article);
    });

    app.post(
        "/api/articles/create",
        controller.create
    );


    async function getArticle(req, res, next) {
        let article;
        try {
            article = await Article.findById(req.params.id);
          if (article == null) {
            return res.status(404).json({ message: "Cannot find User" });
          }
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        res.article = article;
        next();
    }

}