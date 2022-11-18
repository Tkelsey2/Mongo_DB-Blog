//Mongoose Database setup for articles
const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desciption: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },

});


module.exports = mongoose.model('Article', articleSchema )