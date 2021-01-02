

import React from 'react';
import ApolloClient from './src/services/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import Routes from "./src/routes"
import { LoadingOverlayProvider } from './src/context/LoadingOverlayContext';

function App() {
    return (
        <LoadingOverlayProvider>
            <ApolloProvider client={ApolloClient}>
                <PaperProvider>
                    <Portal>
                        <NavigationContainer>
                            <Routes />
                        </NavigationContainer>
                    </Portal>
                </PaperProvider>
            </ApolloProvider>
        </LoadingOverlayProvider>
    );
}


export default App