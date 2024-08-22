import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { getUserQr } from '@/services/apiService';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { set } from 'react-hook-form';

interface QrScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { id: number } }, 'params'>
}

const QrScreen:React.FC<QrScreenProps> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = route.params;
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getUserQr(id);
      if (('error' in result)) {
        alert(result.error);
        
      } else {
        setQrCodeDataURL(result.qrCodeDataURL);
        
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
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu Código QR</Text>
      <View style={styles.qrContainer}>
      {qrCodeDataURL && (
        <Image 
          source={{ uri: qrCodeDataURL }} 
          style={styles.qrImage} 
          resizeMode="contain" 
        />
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2b5983',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 30,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
});

export default QrScreen;