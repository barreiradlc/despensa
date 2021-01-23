import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CardColContainer, CardContainer, CardInnerContainer, CardRowContainer, CardRowContainerInner, Label, Title } from '../styles/components';
import CheckBox from '@react-native-community/checkbox';
import { toggleDoneShoppingItem } from '../services/local/PantryLocalService';
import { cor1, cor4 } from '../constants/CORES';
import capitalize from '../utils/capitalize';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const CardShoppingItem: React.FC = ({shoppingItem, handleManageItems, toolTip}) => {
    const navigation = useNavigation()
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

        }

        return (
            <RectButton onPress={handleAdd} style={{ paddingHorizontal: 15 }}>
                <Icon name="plus" size={21} color="#555" />
            </RectButton>
        )
    }
    
    function Minus() {

        function handleMinus(){

        }

        return (
            <RectButton onPress={handleMinus} style={{ paddingHorizontal: 15 }}>
                <Icon name="minus" size={21} color="#555" />
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
                        onValueChange={(newValue) => handleToggle(newValue)}
                    />
                </CardColContainer>
                <CardColContainer >
                    <CardInnerContainer  >
                        <Title color={cor4} opaque={toggleCheckBox} >{capitalize(shoppingItem.provision.name)} </Title>
                        <Label color={cor4} opaque={toggleCheckBox} >{shoppingItem.quantity} unidade{shoppingItem.quantity > 1 && 's'}</Label>                    
                    </CardInnerContainer>
                </CardColContainer>

            </CardRowContainer>
            <CardColContainer style={{ alignSelf: 'center' }}>
                <CardInnerContainer style={{ alignSelf: 'center', flexDirection: 'row' }} >
                    <Minus />
                    <Label color={cor4} opaque={toggleCheckBox} >{shoppingItem.quantity}</Label>                    
                    <Add />
                </CardInnerContainer>
            </CardColContainer>
        </CardRowContainerInner>
    );
}   

export default CardShoppingItem;