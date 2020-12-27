import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import { useNavigation } from '@react-navigation/native';
import getInitialLabel from '../utils/initialLabel';
import DashboardError from '../components/DashboardError';
import LoadingOverlayComponent from '../components/LoadingOverlayComponent';
import { LoadingOverlayContext } from '../context/LoadingOverlayContext';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabRoutes from './tab.routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigation from './drawer.routes';
import SignUpScreen from '../screens/SignUp';
import ShowPantry from '../screens/pantry/Show';
import FormItem from '../screens/pantry/FormItem';
import FormPantry from '../screens/pantry/Form';

const Stack = createStackNavigator();

async function getJWT() {
    try {
        return await AsyncStorage.getItem('@despensaJWT')
    } catch (error) {
        throw new Error("Erro ao buscar JWT");
    }
}

function App() {
    const [jwt, setJwt] = useState()
    const { loading } = useContext(LoadingOverlayContext)

    getJWT()
        .then((token) => {
            console.log(token)

            setJwt(!!token)
        })

    if (jwt == undefined) {
        return null
    }

    return (
        <>
            <Stack.Navigator initialRouteName={!!jwt ? 'Home' : 'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, title: 'Sair' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DashBoard" component={DrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="ShowDespensa" component={ShowPantry} options={{ title: '' }} />
                <Stack.Screen name="FormItem" component={FormItem} options={{ title: '' }} />
                <Stack.Screen name="FormPantry" component={FormPantry} options={{ title: '' }} />
            </Stack.Navigator>
            {loading && <LoadingOverlayComponent label='Aguarde' />}
        </>
    );
}

export default App;
