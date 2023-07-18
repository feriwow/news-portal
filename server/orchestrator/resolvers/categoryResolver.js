const axios = require("axios")
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const BASE_URL_CATEGORY = (process.env.APP_URL || "http://localhost:4002/") + "admin/category/" 
// "http://localhost:4002/admin/category/"

const categoryTypeDefs = `#graphql
type Category{
    id: ID,
    name: String!,
    createdAt: String,
    updatedAt: String
}

type Query{
    categories: [Category]
    category(id: ID): Category
}

input CategoryForm{
    name: String
}

type Mutation{
    addCategory(input: CategoryForm): Category
    deleteCategory(id: ID): Category
    updateCategory(id: ID, input: CategoryForm): Category
}
`

const categoryResolver = {
    Query: {
        categories: async() => {
            const categories = await axios.get(BASE_URL_CATEGORY)
            return categories.data
        },
        category: async(_,{id}) => {
            const category = await axios.get(BASE_URL_CATEGORY + id)
            return category.data
        }
    },
    Mutation: {
        addCategory: async (_, {input}) => {
            const response = await axios.post(BASE_URL_CATEGORY, input)
            return JSON.parse(response.config.data)
        },
        deleteCategory: async(_, {id}) => {
            const response = await axios.delete(BASE_URL_CATEGORY + id)
            console.log(response);
            return response.data
        },
        updateCategory: async(_, {id, input}) => {
            const response = await axios.put(BASE_URL_CATEGORY + id, input)
            console.log(response);
            return response.data
        }
    }
}


module.exports = {
    categoryTypeDefs,
    categoryResolver
}