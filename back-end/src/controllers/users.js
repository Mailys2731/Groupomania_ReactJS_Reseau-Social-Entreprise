const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

exports.signUp = (req, res) => {
  if ( !req.body.username || !req.body.email || !req.body.password ) {
    return res.status(400).json({message: "Paramètre de connexion manquant."})
}
    const nameRegex = /(.*[a-z]){3,30}/
    const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    //Huit caractères au minimum, au moins une lettre et un chiffre:
    const pwdRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (nameRegex.test(req.body.username) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            username:   req.body.username,
            email: req.body.email,
            password:   hash
          });
          user.save()                                                                    
        .then((user) => { 
          if (user) {
            return res.status(201).json({ message: 'Utilisateur créé avec succés' })
          }
        })
        .catch((error) => {res.status(401).json({ error})});  
        })
      .catch((error) => { res.status(500).json({message: " erreur serveur " + error})})
    } else {
      res.status(400).json({message: " paramètres incorrects (Le mot de passe doit contenir minimum 8 caractères, une lettre et un chiffre)"})
    }               
}

exports.login = (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(User => {

        if(!User) {
            const message = `L'utilisateur demandé n'existe pas.`
            return res.status(404).json({ message })
        }
        bcrypt.compare(req.body.password, User.password).then(async valid => {
            if (!valid) {
                const message = `Le mot de passe est incorrect`;
                return res.status(401).json({ message, data: user })
            }

            //JWT
            const token = jwt.sign(
                { userId: User.id },
                privateKey,
                { expiresIn: '24h' }
            )
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: User, token })
        })
    })
    .catch(error => {
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
        return res.status(500).json({message, data: error })
    })
}

exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id).then(user =>{
    if(user === null) {
        const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant';
        return res.status(404).json({message})  
    }
    const userDeleted = user;
    return User.destroy({
        where: { id: user.id}
    })
    .then(_ =>{
        const message = `L\'utilisateur ${userDeleted.username} à bien été supprimé.`
        res.json({ message, data: user })
    })
})
.catch(error => {
    const message = 'L\'utilisateur n\'a pas pu être supprimé. Réessayez dans quelques instants.'
    res.status(500).json({message, data: error})
})
}