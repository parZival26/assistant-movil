import { Image, StyleSheet, Platform, Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
        style={styles.reactLogo}
      />
      <Text style={styles.text}>Bienvenido a Uasistance!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,             
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: 'white', 
  },
  text: {
    color: '#2b5983',
    fontSize: 24,
    paddingLeft: 150,
    paddingTop: 40,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 190,
    
  },
});
