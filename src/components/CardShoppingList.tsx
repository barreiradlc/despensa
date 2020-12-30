import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { CardContainer, Label, Title } from '../styles/components';

const CardShoppingList: React.FC = ({shoppingList}) => {
    const navigation = useNavigation()

    function handleNavigateShow(){
        navigation.navigate('ShowShoppingList', {
            shoppingList            
        })
    }

    return (
        <CardContainer onPress={handleNavigateShow}>
            <Title>{shoppingList.name} </Title>
            {/* <Label>{shoppingList.items.lenth}</Label> */}
        </CardContainer>
    );
}   

export default CardShoppingList;