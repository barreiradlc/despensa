
import AsyncStorage from '@react-native-community/async-storage';

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ApolloProvider } from 'react-apollo';
import { YellowBox, AppState } from 'react-native';

import Navigator from './src/components/Navigator'
import QueueProcess from './src/components/QueueProcess'
import client from './src/components/apollo';
import UserProvider from  './src/components/state/Provider'
import * as LocalStorage from "./src/services/LocalStorage";


console.disableYellowBox = true;
      
function App() {  
  const [ reload, setReload ] = React.useState(true)
  const [ token, setToken ] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getToken()        
  }, [])
  
  function updateShopList(){
    if(reload){
      console.debug("updateShopList")
      LocalStorage.updateShopList()
    }
  }
  
  async function getToken(){
    LocalStorage.updateShopList()
    const value = await AsyncStorage.getItem('@token');
    setToken(value)
    setLoading(false)
    AppState.addEventListener('change', _handleAppStateChange);
  }
  function _handleAppStateChange (nextAppState){  
    if(nextAppState === 'inactive' || nextAppState === 'background'){
      updateShopList()
      setReload(false)
    } else if(nextAppState === 'active'){
      setReload(true)
    }
  }

  if(loading){
    return null
  }

  return (
    <UserProvider>
      <ApolloProvider client={client} >
        <PaperProvider>
          <Navigator token={token} />''
        </PaperProvider>        
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;