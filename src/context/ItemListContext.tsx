import React, { useCallback, useState } from 'react';
import { createContext } from "react";
import realm from '../config/realmConfig/realm';
import { getPantry, getPantryByUuid, ItemInterface, minusQuantity, moreQuantity } from '../services/local/PantryLocalService';

interface ItemListContextData {
    items: ItemInterface[];
    setItemsList(uuid: string, add: boolean): void;
    populateItemsList(uuid: string): string;
    setItemsQuantity(): void;
}

export const ItemListContext = createContext<ItemListContextData>({} as ItemListContextData)

export const ItemListProvider: React.FC = ({ children }) => {
    const [items, setItems] = useState([] as ItemInterface[])
    const [pantryUuid, setPantryUuid] = useState<string>()

    const setItemsList = useCallback((data: any, uuid: string) => {
        setItems(data)
        setPantryUuid(uuid)
    }, [])

    const populateItemsList = useCallback(async(uuid: string) => {

        const data = await getPantryByUuid(uuid)

        if(data){
            setItems(data?.items)
            setPantryUuid(uuid)
        };

        console.log({data})

        return data.uuid
    }, [])

    const setItemsQuantity = useCallback(async(uuid: string, add: boolean) => {
        const data = await getPantryByUuid(pantryUuid)

        const itemsList = await items.map((item: ItemInterface) => {

            if (item.uuid === uuid) {
                realm.write(() => {
                    const newQuantity = add ? item.quantity++ : item.quantity--
                    data.queue = true
                    item.queue = true
    
                    return {
                        ...item,
                        quantity: newQuantity
                    }
                })
            }
            return item
        })

        console.log(JSON.stringify(items))
        console.log("itemsList")
        console.log(JSON.stringify(itemsList))
        
        setItems(itemsList)
    }, [])

    return (
        <ItemListContext.Provider value={{ items, setItemsList, setItemsQuantity, populateItemsList, pantryUuid }}>
            {children}
        </ItemListContext.Provider>
    );
}
