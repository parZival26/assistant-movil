import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const AccessAcceptedScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Acceso denegado</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  messageContainer: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccessAcceptedScreen;
