import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Uassistance</ThemedText>
        <Image
          source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>

      {/* Tarjeta de perfil */}
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png' }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <ThemedText style={styles.profileName}>Nombre del Usuario</ThemedText>

          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              editable={true}
              defaultValue="usuario@correo.com"
              keyboardType="email-address"
            />
          </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 60,
  },
  profileImage: {
    width: 125,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  emailContainer: {
    backgroundColor: '#dcdcdc',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: 305,
    height: 60,
    justifyContent: 'center',
  },
  emailInput: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    height: '100%',
  },
  reactLogo: {
    width: 70,
    height: 70,
    marginLeft: 11,
    marginTop: 17,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2b5983',
    paddingTop: 30,
    marginTop: 20,
  },
});
