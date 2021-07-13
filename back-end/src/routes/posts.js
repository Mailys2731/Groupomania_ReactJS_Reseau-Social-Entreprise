const express = require ('express')
const router = express.Router()

const auth = require ('../auth/auth')
const multer = require('../middleware/multer-config');


const postsCtrl = require ('../controllers/posts')

router.get('/', auth, postsCtrl.getPosts)

router.get('/:id', auth, postsCtrl.getPost)

router.post('/', multer, postsCtrl.createPost)

router.put('/:id', auth, multer, postsCtrl.putPost)

router.delete('/:id', postsCtrl.deletePost)

module.exports = router