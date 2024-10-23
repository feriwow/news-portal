'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
      Post.hasMany(models.Tags, {
        foreignKey: "postId"
      })
    }
  }
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
        notEmpty: { msg: "title is required" }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "slug is required" },
        notEmpty: { msg: "slug is required" }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "content is required" },
        notEmpty: { msg: "content is required" }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    mongoDbId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeValidate((news) => {
    news.slug = news.title.replace(/ /g, "-")
    // console.log(news.slug, "><><><><><><><><");
  })
  return Post;
};