import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getUserEvents } from '@/services/apiService'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

enum Status {
  starting_soon = 'starting_soon',
  ongoing = 'ongoing',
  finished = 'finished',
}


interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress()}>
      <Image source={{ uri: 'https://xegmenta.com/wp-content/uploads/2019/06/organizar-evento-corp-opt.jpg' }} style={styles.image} />
      <View style={styles.cardContent}>
        <ThemedText style={styles.title}>{event.title}</ThemedText>
        <ThemedText style={styles.description}>{event.description}</ThemedText>
        <ThemedText style={styles.date}>{event.date}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

interface DetallesScreenProps {
  navigation: NavigationProp<any>;
}

const DetallesScreen: React.FC<DetallesScreenProps> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getUserEvents();
      if (!('error' in result)) {
        setEvents(result);
      } else {
        console.log(result.error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    navigation.navigate('CreateEvent'); 
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item}  onPress={() => navigation.navigate("DetailEvent", { id: item.id })}/>}
      />
       <TouchableOpacity style={styles.fab} onPress={handleAddEvent}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
});

export default DetallesScreen;