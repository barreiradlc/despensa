import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CardColContainer, CardContainer, CardInnerContainer, CardRowContainer, Label, Title } from '../styles/components';
import CheckBox from '@react-native-community/checkbox';
import { toggleDoneShoppingItem } from '../services/local/PantryLocalService';


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

    return (
        <CardRowContainer onPress={handleNavigateShow}>
            <CardColContainer >
                <CardInnerContainer  >
                    <Title opaque={toggleCheckBox} >{shoppingItem.provision.name} </Title>
                    <Label opaque={toggleCheckBox} >{shoppingItem.quantity} unidade{shoppingItem.quantity > 1 && 's'}</Label>                    
                </CardInnerContainer>
            </CardColContainer>
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
        </CardRowContainer>
    );
}   

export default CardShoppingItem;