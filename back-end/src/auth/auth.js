const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')
const { User } = require('../db/sequelize');
const user = require('../models/user');


module.exports = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey);
    const userId = decodedToken.userId;
    const user = await User.findAll({where:{ id: userId, token: token }});
    
    if (!user) {
      throw 'Invalid user ID';
    } else {
      req.user = user;
      console.log('auth is ok')
      next();
    }
  } catch (e) {
    console.log(e)
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
  /*  const authorizationHeader = req.headers.authorization
    if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1]
    //Aller chercher le token dans la base de données
    //Obtenir ainsi toutes les infos du user
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      //req.user = user
      next()
    }
  })*/
}