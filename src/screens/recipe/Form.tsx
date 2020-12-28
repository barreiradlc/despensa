import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function Details() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function Ingredients() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function Steps() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function Form() {
    return (

        <Tab.Navigator>
            <Tab.Screen name="Details" component={Details} options={{ title: 'Detalhes' }} />
            <Tab.Screen name="Ingredients" component={Ingredients} options={{ title: 'Ingredientes' }} />
            <Tab.Screen name="Steps" component={Steps} options={{ title: 'Passo a passo' }} />
        </Tab.Navigator>

    );
}

export default Form