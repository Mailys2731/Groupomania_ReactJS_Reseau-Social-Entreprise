const express = require ('express')
const router = express.Router()

const auth = require ('../auth/auth')

const commentsCtrl = require ('../controllers/comments')

router.get('/', auth, commentsCtrl.getComments)

router.post('/', commentsCtrl.createComment)

router.delete('/:id', auth, commentsCtrl.deleteComment)

module.exports = router