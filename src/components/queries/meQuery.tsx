import { gql } from "@apollo/client";

export const ME = gql`
    query me {
        me {
            id
            name
            username
            token
            email
            pantries {
                id
                name
                description
                items {
                    id
                    quantity
                    provision {
                        id
                        name
                    }
                }
                users {
                    id
                    username
                }
            }
        }  
    }
`;

