import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, use } from '@react-navigation/native';

// import Dashboard from '../pages/Dashboard';
// import Favorites from '../pages/Favorites';
// import Orders from '../pages/Orders';

const Tab = createBottomTabNavigator();

const MockPage: React.FC = ({ navigation }) => {
    const navigationRN = useNavigation()

    function handleToggleDrawer() {
        console.log("DRAWER")
        navigation.openDrawer();
    }

    
    // useEffect(() => {
    //     navigationRN.setOptions({
    //         title: "ALOU"            
    //     })
    // }, [])

    return (
        <View style={{ flex:1 }}>
            <TouchableOpacity onPress={handleToggleDrawer} style={{ padding: 40 }}>
                <Text>ALOU</Text>
            </TouchableOpacity>
        </View>
    );
}


const TabRoutes: React.FC = () => (
    <Tab.Navigator
        tabBarOptions={{
            labelPosition: 'beside-icon',
            activeTintColor: '#C72828',
            labelStyle: {
                // fontFamily: 'Poppins-Regular',
                fontSize: 12,
                fontWeight: '600',
            },
            inactiveTintColor: '#B7B7CC',
        }}
    >
        <Tab.Screen
            options={{
                tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
                title: 'Listagem',
            }}
            name="ShoppingList"
            component={MockPage}
            // component={Dashboard}
        />
        <Tab.Screen
            name="Stock"
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon size={25} name="shopping-bag" color={color} />
                ),
                title: 'Estoque',
            }}
            component={MockPage}
            // component={Orders}
        />
        <Tab.Screen
            name="Recipes"
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon size={25} name="book-open" color={color} />
                ),
                title: 'Receitas',
            }}
            component={MockPage}
            // component={Favorites}
        />
    </Tab.Navigator>
);

export default TabRoutes;
