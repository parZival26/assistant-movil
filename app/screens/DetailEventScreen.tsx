import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Text, StyleSheet } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";




import { RouteProp } from "@react-navigation/native";
import { getEvent } from "@/services/apiService";
import { string } from "yup";
import { ThemedView } from "@/components/ThemedView";

interface DetailEventScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { id: number } }, 'params'>
}

interface Event {
  title: string;
  description: string;
  initialDate: string;
  finalDate: string;
  speaker: string;
  location: string;
}

const DetailEventScreen: React.FC<DetailEventScreenProps> = ({ navigation,  route}) => {
  const { id } = route.params;
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

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
    <SafeAreaView>
      <Text>{event?.title}</Text>
    </SafeAreaView>
  )
}


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

export default DetailEventScreen
