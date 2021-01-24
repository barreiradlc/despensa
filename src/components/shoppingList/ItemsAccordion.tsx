import * as React from 'react';


import { useCallback, useState } from 'react';
import { BottomSheet, ListItem } from 'react-native-elements';
import { List } from 'react-native-paper';
import { cor1, cor2, cor3, cor4, cor6 } from '../../constants/CORES';
import { AddShoppingItemTouchable, CardRowContainer, Label, Title } from '../../styles/components';
import FormShoppingItem from '../bottomSheet/FormShoppingItem';
import CardShoppingItem from '../CardShoppingItem';

const ItemsAccordion = ({ expanded, setExpanded, pending, shoppingList }) => {
    const [isVisible, setIsVisible] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    const handleManageItems = useCallback(() => {

    }, [])

    const toolTip = useCallback(() => {

    }, [])

    const handleToggleBottomSheet = useCallback(() => {        
        console.log("isVisible")
        console.log(isVisible)

        setIsVisible(!isVisible)   
    }, []) 

    const handleGetPendingLabel = useCallback(() => {
        if(pending){
            return `- ${pending} ite${pending > 1 ? 'ns' : 'm'} pendentes`
        }
        return ''
    }, [pending])

    return (
        <>
            <List.Accordion
                style={{ backgroundColor: cor1, margin: 15, marginBottom: 0, borderRadius: 15 }}
                titleStyle={{ color: cor6, backgroundColor: cor1, }}
                title={`${shoppingList.name} ${handleGetPendingLabel()}`}
                // left={props => <List.Icon {...props} icon="folder" color={cor2} />}
                expanded={expanded}
                onPress={handlePress}>

                {shoppingList.items.map((item) =>
                    <CardShoppingItem shoppingItem={item} handleManageItems={handleManageItems} toolTip={toolTip} />
                )}
            </List.Accordion>

            {expanded && 
                <AddShoppingItemTouchable bg={cor6} onPress={handleToggleBottomSheet}>
                    <Label color={cor2}>Adicionar item</Label>
                </AddShoppingItemTouchable>
            }

            
            <BottomSheet            
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >        

                <FormShoppingItem  close={handleToggleBottomSheet} shoppingList={shoppingList} />
                      
            </BottomSheet>           
        </>
    );
};

export default ItemsAccordion;