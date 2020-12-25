import React, { useCallback, useState } from 'react';
import { createContext } from "react";
import { ItemInterface } from '../services/local/PantryLocalService';

interface ItemListContextData {
    items: ItemInterface[];
    setItemsList(value: boolean): void; 
}

export const ItemListContext = createContext<ItemListContextData>({} as ItemListContextData)

export const ItemListProvider: React.FC = ({ children }) => {    
    const [ items, setItems ] = useState([] as ItemInterface[])
    
    const setItemsList = useCallback(( data: any ) => {
        setItems(data)
    },[])
    
    const setItemsQuantity = useCallback(( uuid: string, add: boolean ) => {
        const itemsList = items.map(( item: ItemInterface ) => {
            
        })
        // setItems(data)
    },[])

    return (
        <ItemListContext.Provider value={{ items , setItemsList }}>
            {children}
        </ItemListContext.Provider>
    );
}
