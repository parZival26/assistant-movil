import { Image, StyleSheet, Platform, Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Bienvenido!</Text>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#2b5983',
    fontSize: 24,
    paddingLeft: 150,
    paddingTop: 40,
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
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
