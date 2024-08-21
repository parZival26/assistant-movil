import React from 'react';
import { ImageBackground, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background-image.jpg' }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
            style={styles.reactLogo}
          />
          <Text style={styles.text}>Bienvenido a Uassistance!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Unirse a Eventos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#2b5983',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFB820',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold'
  },
});