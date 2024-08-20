import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DetallesScreen() {
  const [project1Expanded, setProject1Expanded] = useState(false);
  const [project2Expanded, setProject2Expanded] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Uassistance</ThemedText>
      </ThemedView>

      <View style={styles.projectContainer}>
        <TouchableOpacity onPress={() => setProject1Expanded(!project1Expanded)}>
          <ThemedText type="subtitle">Proyecto 1</ThemedText>
          {project1Expanded && (
            <ThemedText style={styles.projectDescription}>
              Fecha:
              Descripción:
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.projectContainer}>
        <TouchableOpacity onPress={() => setProject2Expanded(!project2Expanded)}>
          <ThemedText type="subtitle">Proyecto 2</ThemedText>
          {project2Expanded && (
            <ThemedText style={styles.projectDescription}>
              Descripción del Proyecto 2: Este proyecto está enfocado en...
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'blue',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'center',
    padding: 30
  },
  projectContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#708090',
    borderRadius: 10,
    padding: 0,
    marginRight: 10,
    marginLeft: 10,
  },
  projectDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#000000',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});