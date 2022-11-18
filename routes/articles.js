const express = require('express');
const router = express.Router();
const Article = require('./../models/article');


//Gets the new article page
router.get('/new', (req,res) =>{
    res.render('articles/new', {article: new Article()});
});

//Gets new ID for new article and redirects
router.get('/:id', async (req, res) =>{
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', {article: article})
})

//Posts the form/new article
router.post('/', async (req,res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    //async function to setup a new article
    try{
       article = await article.save()
       res.redirect(`/articles/${article.id}`)
    //fails if required fields are not completed
    } catch(e){
        res.render('articles/new', {article:article})
    };
});

router.delete('/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router
