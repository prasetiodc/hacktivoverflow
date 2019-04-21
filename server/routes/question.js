const router = require('express').Router()
const question = require('../controllers/question')

router.get('/', question.findAll)
router.get('/:id', question.findOne)
router.post('/', question.create)
router.delete('/:id', question.delete)
router.put('/:id', question.update)
router.patch('/:id/upvote', question.upvote)
router.patch('/:id/downvote', question.downvote)

module.exports = router 