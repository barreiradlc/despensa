import React, { useCallback, useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheetItemContext } from '../../components/context/BottomSheetItemProvider';

import FormBottomSheet from '../../components/partials/FormBottomSheet';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import FormItem from './FormItem';
import ItemPantry from './ItemPantry';
import NewItemTab from './NewItemTab';

interface ItemContentInterface {
    items: ItemInterface[];
    uuidPantry: string
}

const ItemContent: React.FC<ItemContentInterface> = ({ items, uuidPantry }) => {
    const { handleOpen } = useContext(BottomSheetItemContext)

    const handleOpenBottomSheet = useCallback(() => {
        console.log(uuidPantry)

        handleOpen(uuidPantry)
    }, [items])

    return (
        <>
            {items.map(i =>
                <ItemPantry key={i.uuid} data={i} uuidPantry={uuidPantry} />
            )}

            <NewItemTab handleOpen={handleOpenBottomSheet} />
        </>
    );
}

export default ItemContent;