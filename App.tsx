

import React from 'react';
import ApolloClient from './src/services/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from "./src/routes"
import { LoadingOverlayProvider } from './src/context/LoadingOverlayContext';

function App() {
    return (
        <LoadingOverlayProvider>
            <ApolloProvider client={ApolloClient}>
                <PaperProvider>
                    <NavigationContainer>
                        <Routes />
                    </NavigationContainer>
                </PaperProvider>
            </ApolloProvider>
        </LoadingOverlayProvider>
    );
}


export default App