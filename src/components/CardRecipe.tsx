import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { CardContainer, Label, Title } from '../styles/components';


interface RecipeInterface{
    id: string;
    name: string;
    description: string;
}

interface ListRecipeInterfaceProps{
    recipe: RecipeInterface
}

const CardRecipe: React.FC<ListRecipeInterfaceProps> = ({recipe}) => {
    const navigation = useNavigation()

    function handleNavigateShow(){
        navigation.navigate('ShowRecipe', {
            id: recipe.id
        })
    }

    return (
        <CardContainer onPress={handleNavigateShow}>
            <Title>{recipe.name}</Title>
            <Label>{recipe.description} </Label>
        </CardContainer>
    );
}   

export default CardRecipe;