import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation signUp($signUpData: UserInput!){
        signUp(userInput: $signUpData){
            name
            username
            email
            token
        }
    }
`;