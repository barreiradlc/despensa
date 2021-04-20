import React, { useCallback, useState } from 'react';
import { createContext } from "react";

interface BottomSheetContextData {
    snap: number;
    toggleSnap(value: number): void; 
}

export const BottomSheetContext = createContext<BottomSheetContextData>({} as BottomSheetContextData)

export const BottomSheetProvider: React.FC = ({ children }) => {    
    const [ snap, setSnap ] = useState(1)
    
    const toggleSnap = useCallback(( value: number ) => {        
        setSnap(value)
    },[])

    return (
        <BottomSheetContext.Provider value={{ snap , toggleSnap }}>
            {children}
        </BottomSheetContext.Provider>
    );
}
