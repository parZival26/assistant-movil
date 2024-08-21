import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const events = [
  { id: '1', title: 'Evento 1', description: 'Descripción del evento 1', date: '2023-10-01', image: 'https://example.com/event1.jpg' },
  { id: '2', title: 'Evento 2', description: 'Descripción del evento 2', date: '2023-10-02', image: 'https://example.com/event2.jpg' },
  // Añadir más eventos aquí
];

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <TouchableOpacity style={styles.card} onPress={() => console.log(`Evento ${event.id} presionado`)}>
    <Image source={{ uri: event.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <ThemedText type="title" style={styles.cardTitle}>{event.title}</ThemedText>
      <ThemedText style={styles.cardDate}>{event.date}</ThemedText>
      <ThemedText style={styles.cardDescription}>{event.description}</ThemedText>
    </View>
  </TouchableOpacity>
);

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Uassistance</ThemedText>
        <Image
          source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingBottom: 40,
    backgroundColor: 'white',
  },
  reactLogo: {
    width: 70,
    height: 70,
    marginLeft: 15,
    marginTop: -4,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2b5983',
    paddingTop: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b5983',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
  },
});