import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQrcode, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { getEvent } from '@/services/apiService';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

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

interface Attendance {
  name: string;
  attended: string;
}

const initialData: Attendance[] = [
  { name: 'Juan Pérez', attended: 'Sí' },
  { name: 'María García', attended: 'No' },
  { name: 'Carlos López', attended: 'Sí' },
  { name: 'Ana Martínez', attended: 'No' }
];

const DetailEventScreen: React.FC<DetailEventScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Attendance[]>(initialData);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (index: number) => {
    const newData = [...data];
    newData[index].attended = newData[index].attended === 'Sí' ? 'No' : 'Sí';
    setData(newData);
  };

  const renderItem = ({ item, index }: { item: Attendance, index: number }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleEdit(index)}>
        <Text style={[styles.cell, styles.attendedCell, styles.editableCell]}>{item.attended}</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getEvent(String(id));
      if (!('error' in result)) {
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
        </View>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.eventInfo}>Ponente: {event?.speaker}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Ubicación: {event?.location}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Fecha de Inicio: {event?.initialDate ? formatDate(event.initialDate) : 'N/A'}</ThemedText>
          <View style={styles.separator} />
          <ThemedText style={styles.eventInfo}>Fecha de Finalización: {event?.finalDate ? formatDate(event.finalDate) : 'N/A'}</ThemedText>
        </View>
        <View style={styles.descriptionContainer}>
          <ThemedText style={styles.eventDescription}>{event?.description}</ThemedText>
        </View>
      </View>

      {/* Tabla de asistencia */}
      <View style={styles.tableStyle}>
        <ThemedText style={styles.subtitle}>Tabla</ThemedText>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.nameHeader]}>Nombre</Text>
          <Text style={[styles.headerCell, styles.attendedHeader]}>Asistencia</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      <TouchableOpacity style={styles.qab} onPress={() => navigation.navigate('Qr', { id })}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('ReadQr')}>
        <FontAwesomeIcon icon={faQrcode} size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bab} onPress={() => navigation.navigate('AddUserEvent', { id })}>
        <FontAwesomeIcon icon={faClipboardList} size={30} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

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
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b5983',
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
  tableStyle: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,

  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nameHeader: {
    flex: 1,
    marginLeft: '5%'
  },
  attendedHeader: {
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  nameCell: {
    flex: 1,
    marginLeft: '10%'
  },
  attendedCell: {
    flex: 1,
    textAlign: 'center',
    marginRight: '30%'
  },
  editableCell: {
    color: '#2b5983',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2b5983',
    padding: 20,
  },
  qab: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 170,
    right: 20,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#2b5983',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 90,
    right: 20,
  },
  bab: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailEventScreen;
