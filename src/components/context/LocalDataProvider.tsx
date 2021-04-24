import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from "react";
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { getPantries } from '../../services/local/realm/PantryLocalService';

interface LocalDataContextData {
    pantries: PantryInterface[];
    refreshPantries(): void;
}

export const LocalDataContext = createContext<LocalDataContextData>({} as LocalDataContextData)

export const LocalDataProvider: React.FC = ({ children }) => {
    const [pantriesData, setPantriesData] = useState<PantryInterface[]>([] as PantryInterface[])

    const refreshPantries = useCallback(() => {
        getPantries().then(data => setPantriesData(data))
    }, [])



    const pantries: PantryInterface[] = useMemo(() => {
        return pantriesData
    }, [pantriesData])

    return (
        <LocalDataContext.Provider value={{ pantries, refreshPantries }}>
            {children}
        </LocalDataContext.Provider>
    );
}
