const { Post, Tags, User, Category, sequelize } = require("../models/");
const { compare } = require("../helpers/bcrypt");
const { token } = require("../helpers/token");
const MONGO_DB_ID = "649314e617e44e80d6960865"

class ControllerAdmin {
    static async getNews(req, res, next) {
        try {
            const news = await Post.findAll({
                include: [
                    {
                      model: Tags,
                    },
                    { model: Category }],
                order: [["id", "asc"]]
            });

            res.status(200).json(news);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            //   console.log(req.body);
            const customer = await User.create({
                username,
                email,
                password,
                role: "Admin",
                phoneNumber,
                address,
            });
            res.status(201).json(customer);
        } catch (err) {
            console.log(err);
              next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw { name: "EmailNull" };
            }
            if (!password) {
                // console.log("test");
                throw { name: "PassNull" };
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw { name: "LoginFailed" };
            }

            const isValid = compare(password, user.password);

            if (!isValid) {
                throw { name: "LoginFailed" };
            }
            const accessToken = token({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            res.json({ accessToken });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getNewsById(req, res, next){
        try {
            const {id} = req.params
            const oneNews = await Post.findByPk(+id,{
                include: [
                    {
                      model: Tags,
                    },
                    { model: Category }]
            })
            if (!oneNews) {
                throw { name: "notFound" };
            }

            res.status(200).json(oneNews)
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async postNews(req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            const { title, content, imgUrl, categoryId, mongoDbId, tag1, tag2, tag3 } =
                req.body;
                console.log(mongoDbId, ",.><><><><><><><")
            const news = await Post.create({
                title,
                content,
                imgUrl,
                categoryId,
                mongoDbId
            }, {transaction});
            

            console.log(news, "<><><><><><>");
            const tags = []
            if(tag1){
                tags.push({
                    name: tag1,
                    postId: news.id,
                })
            }
            if(tag2){
                tags.push({
                    name: tag2,
                    postId: news.id,
                })
            }
            if(tag3){
                tags.push({
                    name: tag3,
                    postId: news.id,
                })
            }
            console.log(tags, "ini tags");
            const tag = await Tags.bulkCreate(tags, {transaction});

            await transaction.commit()

            res.status(201).json({ news, tag });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getCategory(req, res, next) {
        try {
            const category = await Category.findAll({
                order: [["id", "asc"]]
            });

            res.status(200).json(category);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async postCategory(req, res, next) {
        try {
            const { name } = req.body;

            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            const post = await Post.findByPk(+id);
            if (!post) {
                throw { name: "notFound" };
            }

            await Post.destroy({ where: {id} });
            res
                .status(200)
                .json({ messages: `post with title ${post.title} success to delete` });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async updatePost(req, res, next){
        const transaction = await sequelize.transaction()
        try {
            const userId = MONGO_DB_ID
            const {id} = req.params
            const { title, content, imgUrl, categoryId, tag1, tag2, tag3 } = req.body;

            const news = await Post.findByPk(+id, {transaction})
            const postUpdate = await Post.update(
                {title, content, imgUrl, categoryId, authorId : userId},
                {where: {id}}
            )

            if(!postUpdate){
                throw{ name: "NotFound" }
            }

            await Tags.destroy({where: {postId:id}, transaction})
            const tags = []
            if(tag1){
                tags.push({
                    name: tag1,
                    postId: news.id,
                })
            }
            if(tag2){
                tags.push({
                    name: tag2,
                    postId: news.id,
                })
            }
            if(tag3){
                tags.push({
                    name: tag3,
                    postId: news.id,
                })
            }
            console.log(tags, "ini tags");
            const tag = await Tags.bulkCreate(tags, {transaction});

            await transaction.commit()
            res.status(201).json({ news, tag })



        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async deleteCategory(req, res, next){
        try {
            const { id } = req.params;
            const category = await Category.findByPk(+id);
            if(!category){
                throw { name: "notFound" };
            }

            await Category.destroy({ where: {id} });
            res
                .status(200)
                .json({ messages: `category with name ${category.name} success to delete` });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async updateCategory(req, res, next){
        try {
            const {id} = req.params
            const {name} = req.body

            const category =await Category.findByPk(+id)
            if(!category){
                throw { name: "NotFound" }
            }

            const update = await Category.update(
                {name},
                {where: {id}}
            )

            res.status(201).json({update})
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async categoryById(req, res, next){
        try {
            const {id} = req.params

            const response = await Category.findByPk(+id)
            if(!response){
                throw { name: "NotFound" }
            }

            res.status(200).json(response)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = ControllerAdmin;
