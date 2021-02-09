import { gql } from "@apollo/client";

export const ME = gql`
    query me {
        me {
            _id
            name
            username
            token
            email
            pantries {
                _id
                name
                description
                items {
                    _id
                    quantity
                    provision {
                        _id
                        name
                    }
                }
                users {
                    _id
                    username
                }
            }
        }  
    }
`;

