import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './tabnavigation.routes';
import AuthRoutes from './auth.routes';
import LoadingOverlayComponent from '../components/utils/LoadingOverlay';
import { LoadingOverlayContext } from '../components/context/LoadingProvider';
import { useContext, useEffect, useMemo, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function Routes() {
    const { loading } = useContext(LoadingOverlayContext)    
    const [ jwt, setJwt ] = useState<boolean | string>()

    async function getJwt(){
        const userData = await AsyncStorage.getItem('@despensaUserData')
        if(userData){
            const { token } = JSON.parse(userData)                
            setJwt(token)
        }
        setJwt(false)
    }

    useEffect(() => {
        getJwt()
    }, [])
        

    if(jwt === undefined) return null;

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={jwt ? 'Home' : 'Auth'} screenOptions={{
                    headerShown: false
                }}>

                    <Stack.Screen name="Auth" component={AuthRoutes} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Dashboard" component={TabNavigation}   />

                </Stack.Navigator>
            </NavigationContainer>
            {loading && <LoadingOverlayComponent label='Aguarde' />}
        </>
    );
}

export default Routes;