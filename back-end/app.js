
const express = require('express')
const { read } = require('fs')
//Middleware qui log toutes les requêtes
const morgan = require('morgan')
const favicon = require ('serve-favicon')
const {Sequelize} = require ('sequelize')
const { success, getUniqueId } = require('./helper.js')

const app = express()
const port =3000

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

app
//Middleware favicon api
.use(favicon (__dirname + '/favicon.ico'))
.use(morgan ('dev'))
//
.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => res.send('Hello express  !'))

const postsRoutes = require ('./routes/posts')
app.use('/api/posts', postsRoutes)

app.listen(port, () => console.log(`app listen on: http://localhost:${port}`))