
module.exports = (sequelize, DataTypes) => {
  const User =sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  })
  User.associate = models => {
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });

    User.hasMany(models.Comment, {
     
    
    });
  };
  return User; 
}

