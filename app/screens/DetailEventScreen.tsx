import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Text, StyleSheet, ScrollView, View, Image, TouchableOpacity } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { RouteProp } from "@react-navigation/native";
import { getEvent } from "@/services/apiService";
import { string } from "yup";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Icon from "react-native-vector-icons/Ionicons";

interface DetailEventScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { id: number } }, 'params'>
}

enum Status {
  starting_soon = 'starting_soon',
  ongoing = 'ongoing',
  finished = 'finished',
}

interface Event {
  title: string;
  description: string;
  initialDate: string;
  finalDate: string;
  speaker: string;
  location: string;
  status: Status;
}

const DetailEventScreen: React.FC<DetailEventScreenProps> = ({ navigation,  route}) => {
  const { id } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.starting_soon:
        return '#808080'; 
      case Status.ongoing:
        return '#28a745'; 
      case Status.finished:
        return '#dc3545'; 
      default:
        return '#000000'; 
    }
  };

  const handleAddEvent = () => {
    navigation.navigate('AddUserEvent', { id: id }); 
  };

  const handleReadUserQr = () => {
    navigation.navigate('Qr', { id: id }); 
  };

  const handleReadQr = () => {
    navigation.navigate('ReadQr'); 
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getEvent(String(id));
      if (!('error' in result)) {
        console.log(result);
        
        setEvent(result);
      } else {
        console.log(result.error);
      }
      setLoading(false);
    };

    fetchEvent();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Uassistance</ThemedText>
        <Image
          source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>
      <View style={styles.eventDetailsContainer}>
        <Image
          source={{ uri: 'https://xegmenta.com/wp-content/uploads/2019/06/organizar-evento-corp-opt.jpg' }} 
          style={styles.eventImage}
        />
        <View style={styles.titleRow}>
          <ThemedText type="title" style={styles.eventTitle}>{event?.title}</ThemedText>
          <View style={styles.statusRow}>

            {/* <FontAwesomeIcon icon={faCircle} size={16} color={getStatusColor(event?.status)} style={styles.statusIcon} />
            <ThemedText style={styles.statusText}>{getStatusText(status)}</ThemedText> */}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.eventInfo}>Ponente: {event?.speaker}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Ubicación: {event?.location}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Fecha de Inicio: {event?.initialDate}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Fecha de Finalización: {event?.finalDate}</ThemedText>
          
        </View>
        <View style={styles.descriptionContainer}>
          <ThemedText style={styles.eventDescription}>{event?.description}</ThemedText>
        </View>
      </View>
      <TouchableOpacity style={styles.qab} onPress={handleReadUserQr}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={handleReadQr}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bab} onPress={handleAddEvent}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </ScrollView>

  );

}

export default DetailEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffd',
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
  eventDetailsContainer: {
    padding: 16,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b5983',
    flex: 1,
    textAlign: 'left',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  eventInfo: {
    fontSize: 14,
    color: '#666',
    padding: 10,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginVertical: 8,
  },
  descriptionContainer: {
    backgroundColor: '#f0f0f0', 
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  bab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 100,
    //yellow background
    backgroundColor: '#FFD700',
    borderRadius: 30,
    elevation: 8,
  },
  qab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 170,
    //red background
    backgroundColor: '#FF0000',
    borderRadius: 30,
    elevation: 8,
  },
});