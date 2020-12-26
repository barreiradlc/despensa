import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Estoque from '../screens/despensa/List';
import { RecipeProvider } from '../context/RecipeContext';
import ListRecipe from '../screens/recipe/List';

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
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={handleToggleDrawer} style={{ padding: 40 }}>
                <Text>ALOU</Text>
            </TouchableOpacity>
        </View>
    );
}


const TabRoutes: React.FC = () => (
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
                name="Recipes"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon size={25} name="book-open" color={color} />
                    ),
                    title: 'Receitas',
                }}
                component={ListRecipe}
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
                options={{
                    tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
                    title: 'Listagem',
                }}
                name="ShoppingList"
                component={MockPage}
            />
        </Tab.Navigator>
    </RecipeProvider>
);

export default TabRoutes;
