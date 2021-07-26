const express = require ('express')
const router = express.Router()

const usersCtrl = require ('../controllers/users')

router.post('/login', usersCtrl.login)

router.post('/signup', usersCtrl.signUp)

router.get('/:id', usersCtrl.getOneUser)

router.delete('/:id', usersCtrl.deleteUser)

router.put('/:id/token', usersCtrl.updateToken)


module.exports = router