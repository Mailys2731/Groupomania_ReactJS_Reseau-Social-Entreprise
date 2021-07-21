const express = require ('express')
const router = express.Router()

const auth = require ('../auth/auth')

const commentsCtrl = require ('../controllers/comments')

router.get('/', commentsCtrl.getComments)

router.post('/', commentsCtrl.createComment)

router.delete('/:id', commentsCtrl.deleteComment)

module.exports = router