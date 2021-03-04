const mongoose = require('mongoose');

const Article = mongoose.model(
    "Article",
    new mongoose.Schema({
        categorie: Array,
        name: String,
        content: String
    })
)

module.exports = Article;