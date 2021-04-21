import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createContext } from "react";
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import FormItem from '../../screens/pantry/FormItem';
import FormBottomSheet from '../partials/FormBottomSheet';

interface BottomSheetItemContextData {
    handleClose(): void;
    handleOpen(uuiPantry: string, item?: ItemInterface): void;
}

export const BottomSheetItemContext = createContext<BottomSheetItemContextData>({} as BottomSheetItemContextData)

export const BottomSheetItemProvider: React.FC = ({ children }) => {
    const formRef = useRef(null);
    const [pantry, setPantry] = useState('')
    const [itemSelected, setItemSelected] = useState<ItemInterface>({} as ItemInterface)

    const itemFormData = useMemo(() => {
        return {
            item: itemSelected,
            uuidPantry: pantry
        }
    }, [pantry, itemSelected])

    function renderForm() {
        return <FormItem close={handleClose} data={itemFormData} />
    };

    function handleClose() {
        formRef.current.toggle(1)
        // init()
    }

    function handleOpen(uuiPantry: string, item?: ItemInterface) {
        setPantry(uuiPantry)
        setItemSelected({} as ItemInterface)
        formRef.current.toggle(0)
    }

    return (
        <BottomSheetItemContext.Provider value={{ handleClose, handleOpen }}>
            {children}

            <FormBottomSheet ref={formRef} content={renderForm} />
        </BottomSheetItemContext.Provider>
    );
}
