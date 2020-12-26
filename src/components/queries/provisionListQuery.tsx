import { gql } from "@apollo/client";

export const PROVISIONS = gql`
    query listProvision($queryListInput: QueryListInput!){
        provisions(queryListInput: $queryListInput){
          id
          name
        }
    }
`;

