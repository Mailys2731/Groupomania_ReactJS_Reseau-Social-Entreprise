
module.exports = (sequelize, DataTypes) => {
  //define déclare un nouveau model au sein de sequelize (sequelize va créer la table postS)
  return sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER, //entier
      //garanti l'unicité de l'id de chaque posts
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    //timestamps permet la modification des paramètres par défaut.  
    timestamps: true,
    createdAt: 'created',
    updatedAt: true
  })



}

