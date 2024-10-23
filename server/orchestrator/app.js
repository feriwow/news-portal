const axios = require("axios");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { newsResolvers, newsTypesDefs } = require("./resolvers/newsResolver");
const {categoryResolver, categoryTypeDefs} = require("./resolvers/categoryResolver")


const BASE_URL_USER = process.env.USER_URL || "http://localhost:4001/";

const userTypeDefs = `#graphql
type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type Query{
users: [User]
user(_id: ID): User
}

input UserForm{
  username: String
  email: String!
  password: String!
  role: String
  phoneNumber: String
  address: String
}

type Mutation{
  addUser(input: UserForm): User
  deleteUser(_id: ID) : User
}
`

const userResolvers = {
  Query: {
    users: async () => {
      const users = await axios.get(BASE_URL_USER);
      return users.data;
    },
    user: async (_, { _id }) => {
      const user = await axios.get(BASE_URL_USER + "user" + `/${_id}`);
      return user.data
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const response = await axios.post(BASE_URL_USER + "user", input);
      // console.log(response.config.data);
      return JSON.parse(response.config.data)
    },
    deleteUser: async(_,{_id}) => {
      // console.log(_id);
      const response = await axios.delete(BASE_URL_USER + `user/${_id}`)
      console.log(response.data.message);
      return response.data.message
    }
  },
};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, newsTypesDefs, categoryTypeDefs],
  resolvers: [userResolvers, newsResolvers, categoryResolver],
  introspection: true
})

async function run() {
  const {url} = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

run();
