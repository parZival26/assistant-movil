import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { User } from '@/interfaces/User';
import { addUserEvent, getUsers } from '@/services/apiService';
import { ThemedView } from '@/components/ThemedView';
import { NavigationProp, RouteProp } from '@react-navigation/native';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <SafeAreaView style={styles.card}>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
    </SafeAreaView>
  );
};


interface AddUserEventScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { id: number } }, 'params'>
}

const AddUserEventScreen: React.FC<AddUserEventScreenProps> = ({navigation, route}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = route.params;

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      if (!('error' in result)) {
        setUsers(result);
      } else {
        console.log(result.error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const toggleSelection = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.item,
          selectedUsers.includes(item.id) && styles.itemSelected
        ]}
        onPress={() => toggleSelection(item.id)}
      >
        <Text style={styles.itemText}>{item.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.circle,
          selectedUsers.includes(item.id) && styles.circleSelected
        ]}
        onPress={() => toggleSelection(item.id)}
      />
    </View>
  );

  const handleSend = async () => {
    console.log('Selected Users:', selectedUsers);
    const result = await addUserEvent(id, selectedUsers.map(Number));
    if ('error' in result) {
      console.log(result.error);
    } else {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Seleccionar Usuarios</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedUsers}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSend}
          disabled={selectedUsers.length === 0}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2b5983',
    paddingTop: 28,
  },
  listContainer: {
    flexGrow: 1,
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: '2.5%',
    marginRight: '2.5%',
  },
  item: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 7,
    flex: 1,
    marginRight: 10,
  },
  itemSelected: {
    backgroundColor: '',
  },
  itemText: {
    fontSize: 18,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  circleSelected: {
    backgroundColor: '#2b5983',
    borderColor: '#2b5983',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#FFB820',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default AddUserEventScreen;
