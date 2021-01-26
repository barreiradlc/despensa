import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CardColContainer, CardContainer, CardInnerContainer, CardRowContainer, CardRowContainerInner, Label, Title } from '../styles/components';
import CheckBox from '@react-native-community/checkbox';
import { ShoppingItemInterface, toggleDoneShoppingItem } from '../services/local/PantryLocalService';
import { cor1, cor4 } from '../constants/CORES';
import capitalize from '../utils/capitalize';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import realm from '../config/realmConfig/realm';

import Toast from 'react-native-simple-toast';

const CardShoppingItem: React.FC = ({shoppingItem, handleManageItems, toolTip, handleUpdateItem}) => {
    const navigation = useNavigation()
    // const [shoppingItem, setShoppingItem] = useState(shoppingItemProps)
    const [toggleCheckBox, setToggleCheckBox] = useState(shoppingItem.done) 

    function handleToggle(newValue){
        const itemToSend = {
            uuid: shoppingItem.uuid, 
            provision: shoppingItem.provision, 
            quantity: shoppingItem.quantity, 
            done: newValue
        }

        setToggleCheckBox(newValue)
        toggleDoneShoppingItem(shoppingItem.uuid, newValue)       
        handleManageItems(itemToSend) 
    }

    function handleNavigateShow(){
        toolTip(shoppingItem.uuid)
        // navigation.navigate('ShowShoppingList', {
        //     shoppingList            
        // })
    }

    function Add() {
        function handleAdd(){
            realm.write(() => {
                let item: ShoppingItemInterface = realm.objectForPrimaryKey<ShoppingItemInterface>(`ShoppingItem`, shoppingItem.uuid)

                item.quantity = shoppingItem.quantity + 1
                handleUpdateItem(item)
                // setShoppingItem(item)
            })
        }

        return (
            <RectButton onPress={handleAdd} style={{ paddingHorizontal: 15 }}>
                <Icon name="plus" size={26} color="#555" />
            </RectButton>
        )
    }
    
    function Minus() {

        function handleMinus(){
            if(shoppingItem.quantity === 1){
                return Toast.showWithGravity("Não é permitida uma quantidade abaixo de 1", 500, Toast.CENTER)
            }

            realm.write(() => {
                let item: ShoppingItemInterface = realm.objectForPrimaryKey<ShoppingItemInterface>(`ShoppingItem`, shoppingItem.uuid)

                item.quantity = shoppingItem.quantity - 1
                
                handleUpdateItem(item)
                // setShoppingItem(item)
            })
        }

        return (
            <RectButton onPress={handleMinus} style={{ paddingHorizontal: 15, opacity: shoppingItem.quantity > 1 ? 1 : 0.4 }}>
                <Icon name="minus" size={26} color="#555" />
            </RectButton>
        )
    }

    return (
        <CardRowContainerInner>
            <CardRowContainer onPress={handleNavigateShow}>
                <CardColContainer>
                    <CheckBox
                        style={{
                            // backgroundColor: '#dedede',
                            width: 50,
                            height: 35,
                        }}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => { handleToggle(newValue), handleUpdateItem({ done: newValue, ...shoppingItem}) }}
                    />
                </CardColContainer>
                <CardColContainer >
                    <CardInnerContainer  >
                        <Title color={cor4} opaque={toggleCheckBox} >{capitalize(shoppingItem.provision.name)} </Title>
                        {/* <Label color={cor4} opaque={toggleCheckBox} >{shoppingItem.quantity} unidade{shoppingItem.quantity > 1 && 's'}</Label>                     */}
                    </CardInnerContainer>
                </CardColContainer>

            </CardRowContainer>
            <CardColContainer style={{ alignSelf: 'center' }}>
                <CardInnerContainer style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row' , justifyContent: 'center', opacity: toggleCheckBox ? 0.4 : 1 }} >
                    <Minus />
                    <Label color={cor4} opaque={toggleCheckBox} >{shoppingItem.quantity}</Label>                    
                    <Add />
                </CardInnerContainer>
            </CardColContainer>
        </CardRowContainerInner>
    );
}   

export default CardShoppingItem;