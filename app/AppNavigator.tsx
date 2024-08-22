import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import CreateEventScreen from './screens/CreateEventScreen';
import DetailEventScreen from './screens/DetailEventScreen';
import ReadQrScreen from './screens/ReadQrScreen';
import AddUserEventScreen from './screens/AddUserEventScreen';
import AccessDeniedScreen from './screens/AccessDeniedScreen';
import AccessAcceptedScreen from './screens/AccessAcceptedScreen';
import QrScreen from './screens/QrScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} /> 
         <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="DetailEvent" component={DetailEventScreen} options={{ headerShown: false }} />
         <Stack.Screen name="ReadQr" component={ReadQrScreen} options={{ headerShown: false }} />
         <Stack.Screen name="AddUserEvent" component={AddUserEventScreen} options={{ headerShown: false }} />
         <Stack.Screen name="AccessDenied" component={AccessDeniedScreen} options={{ headerShown: false }} />
         <Stack.Screen name="AccessAccepted" component={AccessAcceptedScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Qr" component={QrScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}