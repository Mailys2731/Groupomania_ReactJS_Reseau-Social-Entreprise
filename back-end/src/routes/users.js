const express = require ('express')
const router = express.Router()
const auth = require ('../auth/auth')


const usersCtrl = require ('../controllers/users')

router.post('/login', usersCtrl.login)

router.post('/signup', usersCtrl.signUp)

router.get('/:id', usersCtrl.getOneUser)

router.delete('/:id', auth, usersCtrl.deleteUser)

router.put('/:id', auth, usersCtrl.updateToken)


module.exports = router