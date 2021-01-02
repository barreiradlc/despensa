import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { QuantityContainer, QuantityTouchable } from '../../styles/components';
import Icon from 'react-native-vector-icons/Feather';
import { ItemListContext } from '../../context/ItemListContext';
import { ItemInterface } from '../../services/local/PantryLocalService';
import realm from '../../config/realmConfig/realm';

const iconSize = 21

const ItemQuantity: React.FC = ({ item, reloadData }) => {
    // const { setItemsQuantity, items, setItemsList } = useContext(ItemListContext)

    async function handleChangeQuantity(add: boolean) {

        console.log({item})

        realm.write(() => {
            item.quantity = add ? item.quantity + 1 : item.quantity - 1
        })

        reloadData()
        // const itemsList = await items.map((item: ItemInterface) => {

        //     if (item.uuid === uuid) {
        //         realm.write(() => {
        //             const newQuantity = add ? item.quantity++ : item.quantity--

        //             // data.queue = true
        //             item.queue = true
    
        //             return {
        //                 ...item,
        //                 quantity: newQuantity
        //             }
        //         })
        //     }
        //     return item
        // })

        // setItemsList(itemsList)

        // setItemsQuantity(item.uuid, add)
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