import React from 'react';
import { Text, View } from 'react-native';
import { QuantityContainer, QuantityTouchable } from '../../styles/components';
import Icon from 'react-native-vector-icons/Feather';

const iconSize = 24

const ItemQuantity: React.FC = ({item}) => {

    function handleChangeQuantity(add: boolean) {
        
    }

    function handleAdd() {
        handleChangeQuantity(true)
    }
    
    function handleRemove() {
        handleChangeQuantity(false)
    }

  return (
    <QuantityContainer>
        <QuantityTouchable>
            <Icon name="minus" size={iconSize} />
        </QuantityTouchable>
        <QuantityTouchable>
            <Icon name="plus" size={iconSize}/>
        </QuantityTouchable>
    </QuantityContainer>
  );
}

export default ItemQuantity;