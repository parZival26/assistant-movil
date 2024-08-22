import React from 'react';
import { ImageBackground, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import AppNavigator from '../AppNavigator';

export default function IndexScreen() {
  return (
   <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  content: {
    alignItems: 'center',
  },
  reactLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});