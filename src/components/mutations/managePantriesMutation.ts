import { gql } from "@apollo/client";

export const MANAGE_PANTRIES = gql`
mutation managerPantries($pantries: [PantryInput!]!){
    managePantries(pantryInput:$pantries){
      _id
      uuid
      name
      description   
      createdAt
      updatedAt
      deletedAt
      items{
        _id
        uuid
        quantity        
        provision{
          _id
          name
        }
      }
    }
  }
`;