import { gql} from "@apollo/client";

export const GET_CATEGORY = gql`
query Categories {
  categories {
    name
  }
}
`