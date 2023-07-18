const axios = require("axios");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const BASE_URL_NEWS = (process.env.APP_URL || "http://localhost:4002/") + "admin";
const BASE_URL_USER = process.env.USER_URL || "http://localhost:4001/";
// console.log(BASE_URL_NEWS);

const newsTypesDefs = `#graphql
type News{
    id: ID,
    title: String!,
    slug: String,
    content: String!,
    imgUrl: String,
    categoryId: Int,
    mongoDbId: String,
    createdAt: String,
    updatedAt:String,
    Category: Category
    Tags: [Tag]
    User: User
}
type Tag{
  name: String
}

type Query{
    posts: [News]
    post(id: ID): News
}

input NewsForm{
    title: String
    slug: String
    content: String
    imgUrl: String
    categoryId: Int
    mongoDbId: String
}

type Mutation{
    addNews(input: NewsForm): News
    deleteNews(id: ID): News
    updateNews(id: ID, input: NewsForm): News
}
`;

const newsResolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await axios.get(BASE_URL_NEWS + "/news");
        console.log(posts.data);
        console.log(BASE_URL_NEWS);
        return posts.data;
      } catch (err) {
        console.log(err);
      }
    },
    post: async (_, { id }) => {
      try {
        
        const post = await axios.get(BASE_URL_NEWS + "/news/" + id);
        console.log(post.data.mongoDbId);
        const user = await axios.get(BASE_URL_USER + "user" + `/${post.data.mongoDbId}`);
        return {...post.data, User: user.data};
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addNews: async (_, {input}) => {
      try {
        const response = await axios.post(BASE_URL_NEWS + "/news", input)
        console.log("cek cek");
        console.log(response);
        return JSON.parse(response.config.data)
        
      } catch (err) {
        
      }
    },
    deleteNews: async (_, {id}) => {
      try {
        const response = await axios.delete(BASE_URL_NEWS + "/news/" + id)
        console.log(response.data.messages);
        return response.data.messages
        
      } catch (err) {
        console.log(err);
      }
    },
    updateNews: async (_,{id, input}) => {
      // console.log(id);
      try {
        const response = await axios.put(BASE_URL_NEWS + "/news/" + id, input)
        console.log(response);
        return JSON.parse(response.config.data)
        
      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = {
    newsTypesDefs,
    newsResolvers
}