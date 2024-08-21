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
          <Text style={styles.text}>Bienvenido a Uasistance!</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para mejor visibilidad
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