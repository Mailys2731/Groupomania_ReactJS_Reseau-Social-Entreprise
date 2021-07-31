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
}