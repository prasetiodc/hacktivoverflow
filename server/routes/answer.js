const router = require('express').Router()
const answer = require('../controllers/answer')
const {authentication} = require('../middleware/auth')

router.get('/', answer.findAll)
router.get('/:id', answer.findOne)
router.post('/', authentication, answer.create)
router.put('/:id', answer.update)
router.patch('/:id/upvote', answer.upvote)
router.patch('/:id/downvote', answer.downvote)

module.exports = router 