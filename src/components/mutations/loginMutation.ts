import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($loginData: LoginInput!){
        signIn(loginInput: $loginData){
            id
            name
            username
            email
            token
        }
    }
`;
