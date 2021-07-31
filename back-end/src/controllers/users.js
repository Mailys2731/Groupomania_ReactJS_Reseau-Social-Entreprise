const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize')

exports.signUp = (req, res) => {
  if (!req.body.userName || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Paramètre de connexion manquant." })
  }
  const nameRegex = /(.*[a-z]){3,30}/
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  //Huit caractères au minimum, au moins une lettre et un chiffre:
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (nameRegex.test(req.body.userName) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
          admin: false
        });
        user.save()
          .then((user) => {
            if (user) {
              return res.status(201).json({ message: 'Utilisateur créé avec succés' })
            }
          })
          .catch((error) => { res.status(401).json({ error }) 
        console.log(error)});
      })
      .catch(error => {
        res.status(500).json({ message: " erreur serveur " + error })
        console.log(error)
      })

  } else {
    res.status(400).json({ message: " paramètres incorrects (Le mot de passe doit contenir minimum 8 caractères, une lettre et un chiffre)" })
    console.log(error)
  }
}

exports.login = (req, res) => {
  User.findOne({ where: { userName: req.body.userName } }).then(User => {

    if (!User) {
      const message = `L'utilisateur demandé n'existe pas.`
      return res.status(404).json({ message })
    }
    bcrypt.compare(req.body.password, User.password).then(async valid => {
      if (!valid) {
        const message = `Le mot de passe est incorrect`;
        return res.status(401).json({ message, data: User })
      }

      //JWT
      const response = jwt.sign(
        { userId: User.id },
        privateKey,
        { expiresIn: '24h' }
      )
      console.log("responseTest", response)
      User.token = await response;
      await User.save();

      res.status(200).json({ // connexion de l'utilisateur
        userId: User.id,
        token: response,
        message: 'Utilisateur connecté'
      })
    })
  })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      console.log(error)

      return res.status(500).json({ message, data: error })
    })
}

exports.getOneUser = (req, res) => {
  try {
    User.findByPk(req.params.id).then(user => { // vérification de la présence de l'utilisateur dans la bdd
      if (user === null) { // si aucun résultat ou erreur
        res.status(401).json({ message: 'Utilisateur non trouvé !' })
      } else { // si utilisataur trouvé
        console.log(user instanceof User)
        res.status(200).json(user); // récupération de l'utilisateur
      }
    })
  } catch (error) {
    res.status(500).json({ error })
    console.log(error)
  }
}

exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id).then(user => {
    if (user === null) {
      const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant';
      return res.status(404).json({ message })
    }
    const userDeleted = user
    return User.destroy({
      where: { id: user.id }
    })
      .then(_ => {
        const message = `L\'utilisateur ${userDeleted.userName} à bien été supprimé.`
        res.json({ message, data: user })
      })
  })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être supprimé. Réessayez dans quelques instants.'
      res.status(500).json({ message })
      console.log(error)
    })
}

exports.updateToken = (req, res) => {
  User.findByPk(req.params.id).then(user => {
    console.log(req.params.id)
    if (user === null) {
      const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant';
      return res.status(404).json({ message })
    }
    User.update(

      {
        ...user, token: null
      },
      {
        where: { id: user.id }
      })
      .then(_ => {
        const message = `L\'utilisateur à bien été déconnecté.`
        res.status(200).json({ message, data: user })
      })
  })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être déconnecté. Réessayez dans quelques instants.'
      res.status(500).json({ message })
      console.log(error)
    })
}

