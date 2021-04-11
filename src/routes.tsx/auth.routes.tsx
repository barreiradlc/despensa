import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './tabnavigation.routes';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';

const Stack = createStackNavigator();

function AuthRoutes() {
  return (    
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
        }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>    
  );
}

export default AuthRoutes;