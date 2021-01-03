import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ActionTouchable, QuantityContainer, QuantityTouchable } from '../../styles/components';
import Icon from 'react-native-vector-icons/Feather';
import { ItemListContext } from '../../context/ItemListContext';
import { useNavigation } from '@react-navigation/native';
import { deleteItem, deleteShoppingItem } from '../../services/local/PantryLocalService';

const iconSize = 21

const ItemActions: React.FC = ({ item, setToggle, reloadData, handleEditItem }) => {
    const { populateItemsList, pantryUuid } = useContext(ItemListContext)
    const navigation = useNavigation()

    function handleDelete() {
        setToggle('')
        // alert("DELETE")
        deleteShoppingItem(item.uuid)
        reloadData()
    }

    function handleEdit() {
        setToggle('')
        handleEditItem(item)
    }

    return (
        <QuantityContainer>
            <ActionTouchable onPress={handleEdit} done={item.done}>
                <Icon name="edit" size={iconSize} color="#fff34f" />
            </ActionTouchable>
            <ActionTouchable onPress={handleDelete}>
                <Icon name="trash" size={iconSize} color="#ff4f4f" />
            </ActionTouchable>
        </QuantityContainer>
    );
}

export default ItemActions;