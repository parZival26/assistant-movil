import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import CreateEventScreen from './screens/CreateEventScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} /> 
         <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} /> 
      </Stack.Navigator>
  );
}