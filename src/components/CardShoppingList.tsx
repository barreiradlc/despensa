import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { ShoppingItemInterface } from '../services/local/PantryLocalService';
import { CardContainer, Label, Title } from '../styles/components';

const CardShoppingList: React.FC = ({shoppingList}) => {
    const navigation = useNavigation()

    function handleNavigateShow(){
        navigation.navigate('ShowShoppingList', {
            shoppingList            
        })
    }

    const itemsLength = useMemo(() => {
        return shoppingList
            .items
            .filter(( item: ShoppingItemInterface) => !item.done )
            .length
    },[shoppingList])

    return (
        <CardContainer onPress={handleNavigateShow}>
            <Title>{shoppingList.name} </Title>
            <Label>{itemsLength} ite{itemsLength > 1 ? 'ns' : 'm'} pendentes</Label>
        </CardContainer>
    );
}   

export default CardShoppingList;