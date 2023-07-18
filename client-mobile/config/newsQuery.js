import { gql } from "@apollo/client";

export const GET_NEWS = gql`
query Query {
  posts {
    Category {
      name
    }
    categoryId
    createdAt
    id
    imgUrl
    title
    content
  }
}

`

export const ONE_NEWS = gql`
query Post($postId: ID) {
  post(id: $postId) {
    Category {
      name
    }
    Tags {
      name
    }
    User {
      email
    }
    title
    content
    imgUrl
    id
  }
}
`

