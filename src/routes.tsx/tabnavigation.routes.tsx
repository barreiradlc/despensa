import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryList from '../screens/pantry/List';

function Working() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Em construção...</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const navigation = useNavigation()

  navigation.setOptions({

  })

  return (
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
      }}>

      <Tab.Screen
        name="Despensas"
        component={PantryList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="shopping-bag" color={color} />
          ),
          title: 'Estoque',
        }}
      />

      <Tab.Screen 
        name="Compras" 
        component={Working} 
        options={{
          tabBarIcon: ({ color }) => <Icon size={25} name="list" color={color} />,
          title: 'Compras',
        }}
      />

      <Tab.Screen 
        name="Receitas" 
        component={Working} 
        options={{
          tabBarIcon: ({ color }) => (
              <Icon size={25} name="book-open" color={color} />
          ),
          title: 'Receitas',
        }}
      />

    </Tab.Navigator>
  );
}
