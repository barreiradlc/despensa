import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CardContainer, Label, Title } from '../styles/components';
import CheckBox from '@react-native-community/checkbox';
import { toggleDoneShoppingItem } from '../services/local/PantryLocalService';


const CardShoppingItem: React.FC = ({shoppingItem, handleManageItems}) => {
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
        // navigation.navigate('ShowShoppingList', {
        //     shoppingList            
        // })
    }

    return (
        <CardContainer onPress={handleNavigateShow} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Title opaque={toggleCheckBox} >{shoppingItem.provision.name} </Title>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => handleToggle(newValue)}
            />
        </CardContainer>
    );
}   

export default CardShoppingItem;