const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    title: String,
    description: String,
    upvotes: Number,
    downvotes: Number
})

let Answer = mongoose.model('Answer',answerSchema)

module.exports = Answer