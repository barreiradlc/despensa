import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { QuantityContainer, QuantityTouchable } from '../../styles/components';
import Icon from 'react-native-vector-icons/Feather';
import { ItemListContext } from '../../context/ItemListContext';

const iconSize = 21

const ItemQuantity: React.FC = ({item}) => {
    const { setItemsQuantity } = useContext(ItemListContext)

    function handleChangeQuantity(add: boolean) {
        setItemsQuantity(item.uuid, add)
    }

    function handleAdd() {
        handleChangeQuantity(true)
    }
    
    function handleRemove() {
        handleChangeQuantity(false)
    }

  return (
    <QuantityContainer>
        <QuantityTouchable one={item.quantity === 1} onPress={handleRemove}>
            <Icon name="minus" size={iconSize} />
        </QuantityTouchable>
        <QuantityTouchable onPress={handleAdd}>
            <Icon name="plus" size={iconSize}/>
        </QuantityTouchable>
    </QuantityContainer>
  );
}

export default ItemQuantity;