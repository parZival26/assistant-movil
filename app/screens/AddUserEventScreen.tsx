import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { User } from '@/interfaces/User';
import { getUsers } from '@/services/apiService';
import { ThemedView } from '@/components/ThemedView';


const UserCard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <SafeAreaView style={styles.card}>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
        </SafeAreaView>
    )
}

const AddUserEventScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSubmint = async () => {
        console.log('Submit');
    }

    useEffect(() => {
        const fetchEvent = async () => {
          const result = await getUsers();
          if (!('error' in result)) {
            console.log(result);
            setUsers(result);
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
        <ThemedView style={styles.container}>
            <Text>Add User Event Screen</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <UserCard user={item}/>}
            />
        </ThemedView>
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
  

export default AddUserEventScreen
