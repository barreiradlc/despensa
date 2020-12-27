import { gql } from "@apollo/client";

export const QUERY_RECIPES = gql`
  query getRecipes($queryList: QueryListInput!){
    recipes(queryListInput: $queryList){
      id
      name
      description    
    }
  }
`;