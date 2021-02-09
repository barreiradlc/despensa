import * as React from 'react';


import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheet, ListItem } from 'react-native-elements';
import { List } from 'react-native-paper';
import { cor1, cor2, cor3, cor4, cor6 } from '../../constants/CORES';
import { ShoppingItemInterface } from '../../services/local/PantryLocalService';
import { deleteShoppingItem, getShoppingList } from '../../services/local/ShoppingListLocalService';
import { AddShoppingItemTouchable, CardContainerOuter, CardRowContainer, Label, Title } from '../../styles/components';
import FormShoppingItem from '../bottomSheet/FormShoppingItem';
import CardShoppingItem from '../CardShoppingItem';

const ItemsAccordion = ({ shoppingList : shoppingListProps, getFinishedShopping }) => {

    const formShoppingItemRef = useRef()

    const [expanded, setExpanded] = useState(false);
    const [shoppingList, setShoppingList] = useState(shoppingListProps)
    const [pendingLabel, setPendingLabel] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    const handleManageItems = useCallback(() => {

    }, [])

    const toolTip = useCallback(() => {

    }, [])

    const handleToggleBottomSheet = useCallback(() => {        
        console.log("isVisible")
        console.log(isVisible)

        
        if(!isVisible){
            setTimeout(() => {
                formShoppingItemRef?.current.toggle()
            }, 150)
        }
        setIsVisible(!isVisible)
    }, [isVisible]) 

    useEffect(() => {
        const pending = shoppingList
            .items
            .filter(( item: ShoppingItemInterface) => !item.done )
            .length        
        
        if(pending){
            setPendingLabel(`- ${pending} ite${pending > 1 ? 'ns' : 'm'} pendente${pending > 1 ? 's' : ''}`)
        } else {
            setPendingLabel('')
        }
        getFinishedShopping()
    }, [shoppingList])
    
    const handleUpdateItem = useCallback((shoppingItem) => {
        console.log("shoppingItem")
        console.log(shoppingItem)

        const newShoppingList = shoppingList.items.map(( item ) => {
            if(item.uuid === shoppingItem.uuid){
                item = shoppingItem
            }
            return item
        })        
        
        setShoppingList({
            uuid: shoppingList.uuid,
            name: shoppingList.name,
            pantryUuid: shoppingList.pantryUuid,
            done: shoppingList.done,
            createdAt: shoppingList.createdAt,
            updatedAt: shoppingList.updatedAt,
            deletedAt: shoppingList.deletedAt,
            items: newShoppingList,
        })        
    }, [shoppingListProps])

    async function handleRemoveItem(item: ShoppingItemInterface) {
        console.log(item)

        deleteShoppingItem(String(item.uuid))
            .then(async() => {
                setShoppingList(await getShoppingList(shoppingList.uuid))                
            })
    }
    
    return (
        <>
            <List.Accordion
                style={{ backgroundColor: cor1, margin: 15, marginBottom: 0, borderRadius: 15, elevation: 0 }}
                titleStyle={{ color: cor6, backgroundColor: cor1, elevation: 0 }}
                title={`${shoppingList.name} ${pendingLabel}`}
                // left={props => <List.Icon {...props} icon="folder" color={cor2} />}
                expanded={expanded}
                onPress={handlePress}>
                {!!shoppingList.items.length && 
                    <CardContainerOuter>
                        {shoppingList.items.map((item) =>
                            <CardShoppingItem shoppingItem={item} handleManageItems={handleManageItems} handleUpdateItem={handleUpdateItem} toolTip={toolTip} handleRemoveItem={handleRemoveItem} />
                        )}                        
                    </CardContainerOuter>
                }
            </List.Accordion>

            {expanded && 
                <AddShoppingItemTouchable bg={cor6} onPress={handleToggleBottomSheet} style={{ bottom: 5 }}>
                    <Label color={cor2}>Adicionar item</Label>
                </AddShoppingItemTouchable>
            }

            <BottomSheet
                modalProps={{
                 collapsable: true,
                 style: {
                     height: `100%`,
                     flex: 1,
                 },
                 onTouchCancel: () => console.log('CANCEL')
                }}
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <FormShoppingItem close={handleToggleBottomSheet} shoppingList={shoppingList} ref={formShoppingItemRef} />                      
            </BottomSheet>           
        </>
    );
};

export default ItemsAccordion;