

import React from 'react';
import ApolloClient from './src/services/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes"
import { LoadingOverlayProvider } from './src/context/LoadingOverlayContext';

function App() {
    return (
        <LoadingOverlayProvider>
            <ApolloProvider client={ApolloClient}>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </ApolloProvider>
        </LoadingOverlayProvider>
    );
}


export default App