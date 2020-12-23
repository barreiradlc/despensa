import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from '../routes/tab.routes';
import {
    ContainerScroll,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
    cor2,
    ErrorTouchable,
    ErrorLabel,
    ErrorTitle,
    ErrorTouchableContainer
} from "../styles/components"
import LogoutPage from './LogoutPage';

const logo = '../assets/logo.png'

const Drawer = createDrawerNavigator();

const iconSize = 24

interface UserInterface{
    name?: string; 
    username: string; 
    email: string; 
    token: string; 
}

const DrawerComponent: React.FC = ({}: any) => {
    const [ user, setUser ] = useState<UserInterface>({} as UserInterface)

    async function getUser() {
        const userData = await AsyncStorage.getItem('@despensaJWT')
        userData && setUser(JSON.parse(userData))
    }

    getUser()

    if(!user){
        return null
    }

    return (
        <ContainerScroll>

            <ErrorTitle>Bem vindo, {user.name || user.username}</ErrorTitle>            
            
            <Drawer.Screen name="DashBoard" component={TabRoutes} options={{ headerShown: true, drawerIcon: () => <Icon name='home' size={iconSize} />, headerTitle: `Despensa` }} />
            <Drawer.Screen name="Logout" component={LogoutPage} options={{ drawerIcon: () => <Icon name='log-out' size={iconSize} /> }} />
            

        </ContainerScroll>        
    );
}

export default DrawerComponent;