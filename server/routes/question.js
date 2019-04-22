const router = require('express').Router()
const question = require('../controllers/question')
const {authentication} = require('../middleware/auth')

router.get('/', question.findAll)
router.get('/:id', question.findOne)
router.post('/', authentication, question.create)
router.delete('/:id', question.delete)
router.put('/:id', question.update)
router.patch('/:id/upvote', question.upvote)
router.patch('/:id/downvote', question.downvote)

module.exports = router 