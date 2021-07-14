const express = require ('express')
const router = express.Router()

const auth = require ('../auth/auth')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
//const upload = multer({dest: '/uploads/'})

const postsCtrl = require ('../controllers/posts')

router.get('/', auth, postsCtrl.getPosts)

router.get('/:id', auth, postsCtrl.getPost)

router.post('/', upload.single('image'), postsCtrl.createPost)

router.put('/:id', auth, multer, postsCtrl.putPost)

router.delete('/:id', postsCtrl.deletePost)

module.exports = router