import React, { useCallback, useState } from 'react';
import { createContext } from "react";

interface LoadingOverlayContextData {
    loading: boolean;
    toggleOverlay(value: boolean): void; 
}

export const LoadingOverlayContext = createContext<LoadingOverlayContextData>({} as LoadingOverlayContextData)

export const LoadingOverlayProvider: React.FC = ({ children }) => {    
    const [ loading, setLoading ] = useState(false)
    
    const toggleOverlay = useCallback(( value: boolean ) => {        
        setLoading(value)
    },[])

    return (
        <LoadingOverlayContext.Provider value={{ loading , toggleOverlay }}>
            {children}
        </LoadingOverlayContext.Provider>
    );
}
