const express = require ('express')
const router = express.Router()

const auth = require ('../auth/auth')

const postsCtrl = require ('../controllers/posts')

router.get('/', auth, postsCtrl.getPosts)

router.get('/:id', auth, postsCtrl.getPost)

router.post('/', auth, postsCtrl.createPost)

router.put('/:id', auth, postsCtrl.putPost)
const postsCtrl = require ('../controllers/posts')

router.get('/', postsCtrl.getPosts)

router.get('/:id', postsCtrl.getPost)

router.post('/', postsCtrl.postPost)

router.put('/:id', postsCtrl.putPost)

router.delete('/:id', postsCtrl.deletePost)

module.exports = router