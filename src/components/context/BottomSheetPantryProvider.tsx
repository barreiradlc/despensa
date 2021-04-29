import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createContext } from "react";
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import FormPantry from '../../screens/pantry/Form';
import FormItem from '../../screens/pantry/FormItem';
import FormBottomSheet from '../partials/FormBottomSheet';

interface BottomSheetPantryContextData {
    handleClose(): void;
    handleOpen(pantry?: PantryInterface): void;
}

export const BottomSheetPantryContext = createContext<BottomSheetPantryContextData>({} as BottomSheetPantryContextData)

export const BottomSheetPantryProvider: React.FC = ({ children }) => {
    const formRef = useRef(null);
    const [pantryData, setPantryData] = useState<PantryInterface>({} as PantryInterface)

    function renderForm() {
        <FormPantry close={handleClose} data={pantryData} />
    };

    function handleClose() {
        formRef.current.toggle(1)
        // init()
    }

    function handleOpen(uuiPantry: string, item?: ItemInterface) {
        // setPantry(uuiPantry)
        // setItemSelected(item || {} as ItemInterface)
        // set data
        formRef.current.toggle(0)
    }

    return (
        <BottomSheetPantryContext.Provider value={{ handleClose, handleOpen }}>
            {children}

            <FormBottomSheet ref={formRef} content={renderForm} />
        </BottomSheetPantryContext.Provider>
    );
}
