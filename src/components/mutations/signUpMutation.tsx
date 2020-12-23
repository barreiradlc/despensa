import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation signUp($signUpData: UserInput!){
        signUp(userInput: $signUpData){
            id
            name
            username
            email
            token
        }
    }
`;