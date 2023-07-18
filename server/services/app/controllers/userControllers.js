const {Post, Tags, Category, User} = require("../models/");

class ControllerUser {
  static async getNews(req, res, next) {
    try {
      const news = await Post.findAll({
        include: [
            {
              model: User,
            },
            { model: Category },
          ],
        order: [["id", "asc"]]
    });

      res.status(200).json(news);
    } catch (err) {
      console.log(err);
    }
  }

  static async getNewsDetail(req, res, next) {
    try {
      const { id } = req.params;
      const oneNews = await Post.findByPk(+id, {
        include: [
          {
            model: Tags,
          },
          { model: Category },
          {
            model: User,
          }
        ],
      });
      if (!oneNews) {
        throw { name: "notFound" };
      }

      res.status(200).json(oneNews);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCategory(req, res, next){
    try {
      const category = await Category.findAll()
      res.status(200).json(category)
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ControllerUser;
