import { gql } from "@apollo/client";

export const MANAGE_PANTRIES = gql`
mutation managerPantries($pantries: [PantryInput!]!){
    managePantries(pantryInput:$pantries){
      id
      uuid
      name
      description   
      createdAt
      updatedAt
      deletedAt
      items{
        id
        uuid
        quantity        
        provision{
          id
          name
        }
      }
    }
  }
`;