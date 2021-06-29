const express = require ('express')
const router = express.Router()

const postsCtrl = require ('../controllers/posts')

router.get('/', postsCtrl.getPosts)

router.get('/:id', postsCtrl.getPost)

router.post('/', postsCtrl.postPost)

router.put('/:id', postsCtrl.putPost)

router.delete('/:id', postsCtrl.deletePost)

module.exports = router