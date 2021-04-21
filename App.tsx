import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from './src/screens/auth/Login';
import Routes from './src/routes.tsx';
import { LoadingOverlayProvider } from './src/components/context/LoadingProvider';
import { client } from './src/utils/gqlUtils';

const App = () => (
  <LoadingOverlayProvider>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </LoadingOverlayProvider>
);

export default App