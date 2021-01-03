import { gql } from "@apollo/client";

export const CREATE_RECIPE_MUTATION = gql`
    mutation createRecipe($recipe: RecipeInput!){
        createRecipe(recipeInput: $recipe) {
            id
            name
            description
            ingredients {
                id
                unit 			
                quantity
                provision {
                    id
                    name
                }
            }
        }
    }
`;
