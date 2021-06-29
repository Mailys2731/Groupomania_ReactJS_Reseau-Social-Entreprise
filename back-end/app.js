
const express = require('express')
const { read } = require('fs')
//Middleware qui log toutes les requêtes
const morgan = require('morgan')

const app = express()
const port =3000

app
//Middleware favicon api
.use(morgan ('dev'))
.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});




//Points de terminaison
const postsRoutes = require('./src/routes/posts');
app.use('/api/posts', postsRoutes)

//Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`app listen on: http://localhost:${port}`))