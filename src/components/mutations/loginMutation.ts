import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($loginData: LoginInput!){
        signIn(loginInput: $loginData){     
            name
            username
            email
            token
        }
    }
`;
