import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { ShoppingItemInterface } from '../services/local/PantryLocalService';
import { CardContainer, Label, Title } from '../styles/components';
import ItemsAccordion from './shoppingList/ItemsAccordion';

const CardShoppingList: React.FC = ({ shoppingList }) => {
    const navigation = useNavigation()
    const [expanded, setExpanded] = React.useState(true);

    function handleNavigateShow(){
        console.log("shoppingList")
        console.log(shoppingList)

        navigation.navigate('ShowShoppingList', {
            shoppingListItem: shoppingList
        })
        // setExpanded(!expanded)
    }

    const itemsLength = useMemo(() => {
        return shoppingList
            .items
            .filter(( item: ShoppingItemInterface) => !item.done )
            .length
    },[shoppingList])

    return (
        // <>
        // <CardContainer onPress={handleNavigateShow}>
        //     <Title>{shoppingList.name} </Title>                
        // </CardContainer>
        // </>

        <ItemsAccordion expanded={expanded} setExpanded={setExpanded} pending={itemsLength} shoppingList={shoppingList} />
    );
}   

export default CardShoppingList;