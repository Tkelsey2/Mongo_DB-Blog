const express = require('express');
const mongoose = require('mongoose')
//allows usage of delete and other functionality in forms
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog',{ 
    useNewUrlParser:true, useUnifiedTopology:true
});

app.set('view engine', 'ejs')
//allows us to access all parameters of article form inside of article route by accessing req.body._____
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))





//renders the articles to the index.ejs
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdOn:'desc'
    })

    //passes variable/object information to  the index.ejs
    res.render('index', {articles: articles})
})

//Means the created article will now be added to the end of /articles eg. https://localhost/5001/articles/HowToTrainYourDragon
app.use('/articles', articleRouter)

app.listen(5001)