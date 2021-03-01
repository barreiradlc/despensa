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
import ShowRecipe from '../screens/recipe/Show';
import FormRecipe from '../screens/recipe/Form';
import FormShoppingList from '../screens/shoppingList/Form';
import ShowShoppingList from '../screens/shoppingList/Show';

const Stack = createStackNavigator();


function App() {
    
    const [jwt, setJwt] = useState<string | null>()
    const { loading, toggleOverlay } = useContext(LoadingOverlayContext)
    
    async function getJWT() {
        try {
            
            setJwt(                
                await AsyncStorage.getItem('@despensaJWT') + ''
            )
        } catch (error) {
            throw new Error("Erro ao buscar JWT");
        }
    }
    
    useEffect(() => {
        getJWT()    
    }, [])
    
    if(loading || jwt == null) return null;

    return (
        <>
            <Stack.Navigator initialRouteName={!!jwt ? 'Home' : 'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, title: 'Sair' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DashBoard" component={DrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="ShowDespensa" component={ShowPantry} options={{ title: '' }} />
                <Stack.Screen name="ShowRecipe" component={ShowRecipe} options={{ title: '' }} />
                <Stack.Screen name="ShowShoppingList" component={ShowShoppingList} options={{ title: '' }} />
                <Stack.Screen name="FormItem" component={FormItem} options={{ title: '' }} />
                <Stack.Screen name="FormPantry" component={FormPantry} options={{ title: '' }} />
                <Stack.Screen name="FormRecipe" component={FormRecipe} options={{ title: '' }} />
                <Stack.Screen name="FormShoppingList" component={FormShoppingList} options={{ title: '' }} />
            </Stack.Navigator>
            {loading && <LoadingOverlayComponent label='Aguarde' />}
        </>
    );
}

export default App;
