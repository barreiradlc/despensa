import { gql } from "@apollo/client";

export const QUERY_RECIPE = gql`
  query getRecipe($id: String!){
    recipe(id:$id){
      id
      name
      description
      ingredients{
        id
        unit
        quantity
        provision{
          id
          name        
        }
      }
    }
  }
`;