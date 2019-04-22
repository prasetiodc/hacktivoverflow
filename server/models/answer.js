const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    title: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let Answer = mongoose.model('Answer',answerSchema)

module.exports = Answer