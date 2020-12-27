import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { CardContainer, Label, Title } from '../styles/components';

const CardDespensa: React.FC = ({pantry}) => {
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

export default CardDespensa;