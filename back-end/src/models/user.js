
module.exports = (sequelize, DataTypes) => {
  const User =sequelize.define('User', {
    id: {
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
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
      onDelete: "cascade",
    });

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "cascade",
    });
  };
  return User; 
}

