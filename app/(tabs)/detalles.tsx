import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getUserEvents } from '@/services/apiService';

enum Status {
  starting_soon = 'starting_soon',
  ongoing = 'ongoing',
  finished = 'finished',
}


interface Event {
  id: number;
  title: string;
  description: string;
  initialDate: string;
  finalDate: string;
  speaker: string;
  location: string;
  status: Status;
}

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: 'https://xegmenta.com/wp-content/uploads/2019/06/organizar-evento-corp-opt.jpg' }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.cardTitle}>{event.title}</ThemedText>
          </View>
          <View style={styles.decorationLine} />
          <ThemedText style={styles.cardDate}>{formatDate(event.initialDate)}</ThemedText>
          <ThemedText style={styles.cardDescription}>{event.description}</ThemedText>
        </View>
      </TouchableOpacity>
    </>
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Uassistance</ThemedText>
        <Image
          source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>
      <FlatList
        data={events}
        keyExtractor={(item) => String(item.id)}
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
    padding: 0,
    backgroundColor:'#ffffff'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '7%',
    backgroundColor: 'white',
    position: 'relative'
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'visible', 
    marginBottom: 16,
    marginTop: '5%',
    marginLeft: '3%',
    marginRight: '3%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  decorationLine: {
    height: 2, 
    backgroundColor: '#2b5983', 
    marginVertical: 4,
    top:2, 
    width: '100%', 
    marginLeft:-2,
    borderRadius:10
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
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
    color: '#989898',
    marginBottom: 4,
    marginTop: 4,
    borderRadius: 10
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#2b5983',
    borderRadius: 30,
    elevation: 8,
  },
});

export default DetallesScreen;