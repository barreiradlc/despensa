import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { ShoppingItemInterface } from '../services/local/PantryLocalService';
import { CardContainer, Label, Title } from '../styles/components';
import ItemsAccordion from './shoppingList/ItemsAccordion';

const CardShoppingList: React.FC = ({ shoppingList }) => {
    
    const navigation = useNavigation()

    return (
        
    );
}   

export default CardShoppingList;