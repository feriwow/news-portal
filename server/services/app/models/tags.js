'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tags.belongsTo(models.Post, {
        foreignKey:"postId"
      })
    }
  }
  Tags.init({
    postId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "tag name is required" },
        notEmpty: { msg: "tag name is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};