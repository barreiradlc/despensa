import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import TabRoutes from "./tab.routes";
import Icon from 'react-native-vector-icons/Feather';
import { Text, TouchableOpacity, View } from 'react-native';
import LogoutPage from '../components/LogoutPage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerComponent from '../components/DrawerComponent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const iconSize = 24

const MockPage: React.FC = ({ navigation }) => {
    const navigationRN = useNavigation()

    function handleToggleDrawer() {
        console.log("DRAWER")
        navigation.openDrawer();
    }

    return (
        <View style={{ flex:1 }}>
            <TouchableOpacity onPress={handleToggleDrawer} style={{ padding: 40 }}>
                <Text>ALOU</Text>
            </TouchableOpacity>
        </View>
    );
}


function DrawerNavigation({ navigation }) {
    const navigationRN = useNavigation()    

    return (
        <Drawer.Navigator
            initialRouteName="DashBoard"
            drawerType='back'            
            // TODO - drawer
            // drawerContent={props => <DrawerComponent  {...props} />}
        >                        
            <Drawer.Screen name="DashBoard" component={TabRoutes} options={{ headerShown: true, drawerIcon: () => <Icon name='home' size={iconSize} />, headerTitle: `Despensa` }} />
            {/* <Drawer.Screen name="Perfil" component={TabRoutes} options={{ headerShown: true, drawerIcon: () => <Icon name='home' size={iconSize} />, headerTitle: `Despensa` }} /> */}
            {/* <Drawer.Screen name="Receitas Possíveis" component={TabRoutes} options={{ headerShown: true, drawerIcon: () => <Icon name='home' size={iconSize} />, headerTitle: `Despensa` }} /> */}
            {/* <Drawer.Screen name="Compras" component={TabRoutes} options={{ headerShown: true, drawerIcon: () => <Icon name='home' size={iconSize} />, headerTitle: `Despensa` }} /> */}
            <Drawer.Screen name="Logout" component={LogoutPage} options={{ drawerIcon: () => <Icon name='log-out' size={iconSize} /> }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation