
module.exports = (sequelize, DataTypes) => {
  //define déclare un nouveau model au sein de sequelize (sequelize va créer la table postS)
  const Post = sequelize.define('Post', {
    postId: {
      type: DataTypes.INTEGER, //entier
      //garanti l'unicité de l'id de chaque posts
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER, //entier
      //garanti l'unicité de l'id de chaque posts
      foreignKey: true,
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
  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name:userId,
        allowNull:false
      },
    })
  }
  return Post
}

