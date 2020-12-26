import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { QuantityContainer, QuantityTouchable } from '../../styles/components';
import Icon from 'react-native-vector-icons/Feather';
import { ItemListContext } from '../../context/ItemListContext';
import { useNavigation } from '@react-navigation/native';
import { deleteItem } from '../../services/local/PantryLocalService';

const iconSize = 21

const ItemActions: React.FC = ({ item, setToggle }) => {
    const { populateItemsList, pantryUuid } = useContext(ItemListContext)
    const navigation = useNavigation()

    function handleDelete() {
        deleteItem(item.uuid, item.id)
    }

    function handleEdit() {
        setToggle('')
        navigation.navigate('FormItem', {
            item,
            pantryUuid,
            populateItemsList
        })
    }

    return (
        <QuantityContainer>
            <QuantityTouchable onPress={handleEdit}>
                <Icon name="edit" size={iconSize} color="#fff34f" />
            </QuantityTouchable>
            <QuantityTouchable onPress={handleDelete}>
                <Icon name="trash" size={iconSize} color="#ff4f4f" />
            </QuantityTouchable>
        </QuantityContainer>
    );
}

export default ItemActions;