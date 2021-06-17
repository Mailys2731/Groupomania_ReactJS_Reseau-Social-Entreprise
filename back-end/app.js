
const express = require('express')
const { read } = require('fs')
const morgan = require('morgan')
const favicon = require ('serve-favicon')
const { success, getUniqueId } = require('./helper.js')

const app = express()
const port =3000

app
//Middleware favicon api
.use(favicon (__dirname + '/favicon.ico'))
//Middleware qui log toutes les requêtes
.use(morgan ('dev'))
//
.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => res.send('Hello express  !'))

const postsRoutes = require ('./routes/posts')
app.use('/api/posts', postsRoutes)

app.listen(port, () => console.log(`app listen on: http://localhost:${port}`))