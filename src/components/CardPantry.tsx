import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Pantry } from '../config/waterMelonDBConfig/schemas/Pantry';
import { CardContainer, Label, Title } from '../styles/components';

interface CardPantryInterface{
    pantry: Pantry
}

const CardPantry: React.FC<CardPantryInterface> = ({ pantry }) => {
    const navigation = useNavigation()

    function handleNavigateShow(){
        navigation.navigate('ShowDespensa', {
            pantry,
            items: pantry.items
        })
    }

    return (
        <CardContainer onPress={handleNavigateShow}>
            <Title>{pantry.name} </Title>
            <Label>{pantry.description}</Label>
        </CardContainer>
    );
}   

export default CardPantry;