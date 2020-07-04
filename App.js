
import AsyncStorage from '@react-native-community/async-storage';

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ApolloProvider } from 'react-apollo';
import { YellowBox } from 'react-native';

import Navigator from './src/components/Navigator'
import QueueProcess from './src/components/QueueProcess'
import client from './src/components/apollo';
import UserProvider from  './src/components/state/Provider'

console.disableYellowBox = true;

function App() {

  const [ token, setToken ] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getToken()
  }, [])
  
  async function getToken(){
    const value = await AsyncStorage.getItem('@token');
    setToken(value)
    setLoading(false)
  }

  if(loading){
    return null
  }

  return (
    <UserProvider>
      <ApolloProvider client={client} >
        <PaperProvider>
          <Navigator token={token} />
        </PaperProvider>        
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;