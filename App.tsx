import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from './src/screens/auth/Login';
import Routes from './src/routes.tsx';
import { LoadingOverlayProvider } from './src/components/context/LoadingProvider';
import { client, httpLink } from './src/utils/gqlUtils';
import { LocalDataProvider } from './src/components/context/LocalDataProvider';

const App = () => (
  <LoadingOverlayProvider>
    <LocalDataProvider>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </LocalDataProvider>
  </LoadingOverlayProvider>
);

export default App