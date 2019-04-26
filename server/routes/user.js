const router = require('express').Router()
const user = require('../controllers/user')

router.post('/', user.create)
router.post('/login', user.login)
router.get('/', user.findAll)
router.delete('/:id', user.delete)

module.exports = router 
