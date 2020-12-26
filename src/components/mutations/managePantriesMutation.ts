import { gql } from "@apollo/client";

export const MANAGE_PANTRIES = gql`
    mutation managerDespensas($pantries: [PantryInput!]!){
        managePantries(pantryInput:$pantries){
            id
            name
            description    
            items{
                id
                quantity
                createdAt
                updatedAt
                provision{
                    id
                    name
                }
            }
        }
    }
`;