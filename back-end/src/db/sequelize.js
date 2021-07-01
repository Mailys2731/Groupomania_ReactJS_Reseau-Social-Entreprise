const { Sequelize, DataTypes } = require ('sequelize')
const PostModel = require ('../models/post') 
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')


//Instance sequelize qui représente la connexion à la BDD
const sequelize = new Sequelize (
    //Nom BDD
    'groupomania',
    //Identifiant accès BDD
    'root',
    //MDP BDD
    '',
    //Objet de configuration (host et dialect(driver) obligatoire)
    {
        host: 'localhost',
        dialect: 'mysql',
        //dialectOptions: {
        //timezone:'Etc/GMT-2'
        //},
        login: false
        //Time zone et login permettent d'éviter des erreurs
    }
)

sequelize.authenticate()
.then(_ => console.log('La connexion à la base de données à bien été établie.'))
.catch(error => error(`Impossible de se connecter à la base de données ${error}`))

//Créé la table associée au model
const Post = PostModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)


//Synchronise tous les modèles à la BDD
//Force simplifie le développement

const initDb = () => {
    return sequelize.sync({force: true})
    .then(_ =>{
        console.log('INIT DB')
    
        bcrypt.hash ('mailys, 10')
        .then(hash => {
            User.create({
                username:'Mailys',
                password:hash
            })
        })
        .then(user => console.log(user.toJSON()))

        console.log('La base de données a bien été synchronisée')
    })
}


module.exports = {
    initDb, Post, User
}



