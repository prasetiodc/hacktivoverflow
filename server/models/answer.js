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

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let nameSchema = new Schema({
    namaVariable: String,
    namaVariable: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let NamaModal = mongoose.model('NamaModal',nameSchema)

module.exports = NamaModal 