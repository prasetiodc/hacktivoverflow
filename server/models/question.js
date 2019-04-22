const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
    title: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let Question = mongoose.model('Question',questionSchema)

module.exports = Question