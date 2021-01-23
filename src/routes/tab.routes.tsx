import React, { useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Estoque from '../screens/pantry/List';
import { RecipeProvider } from '../context/RecipeContext';
import ListRecipe from '../screens/recipe/List';
import { FAB, Portal } from 'react-native-paper';
import { cor1, cor2 } from '../styles/components';
import ShoppingList from '../screens/shoppingList/List';
import FabGroup from '../components/FabGroup';

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

    return null
}


const TabRoutes: React.FC = () => {

    const route = useRoute()
    const navigation = useNavigation()

    return (
        <RecipeProvider>

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
                    name="ShoppingList"
                    options={{
                        tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
                        title: 'Compras',
                    }}
                    component={ShoppingList}
                />
                                
                <Tab.Screen
                    name="Stock"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon size={25} name="shopping-bag" color={color} />
                            ),
                            title: 'Estoque',
                        }}
                    component={Estoque}
                />

                <Tab.Screen
                    name="Recipes"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon size={25} name="book-open" color={color} />
                        ),
                        title: 'Receitas',
                    }}
                    component={ListRecipe}
                />

            </Tab.Navigator>

            <FabGroup visible={true} />

        </RecipeProvider>
    )
};

export default TabRoutes;
