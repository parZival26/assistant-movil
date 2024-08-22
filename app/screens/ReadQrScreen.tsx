import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraView } from "expo-camera";
import { ValidateQrCode } from '@/services/apiService';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState(''); 
  const [icon, setIcon] = useState(''); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    
    ValidateQrCode(data).then((result) => {
      if ('error' in result) {
        setMessage(`Oops ${result.error}`);
        setIcon('times-circle'); 
      } else {
        setMessage('¡Código QR válido!');
        setIcon('check-circle');
      }
    });

    setTimeout(() => {
      setScanned(false);
      setMessage('');
      setIcon(''); 
    }, 5000);
  };

  const handleCloseMessage = () => {
    setScanned(false);
    setMessage(''); 
    setIcon(''); 
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Permiso de cámara no concedido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escanea el Código QR</Text>
      <Text style={styles.paragraph}>Escanea el codigo para registrar tu asistencia.</Text>
      {renderCamera()}
      {message ? (
        <View style={styles.messageOverlay}>
          <View style={styles.messageContainer}>
            <FontAwesome5 name={icon} size={50} color={icon === 'times-circle' ? 'red' : 'green'} />
            <Text style={styles.messageText}>{message}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleCloseMessage}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={scanned}
      >
        <Text style={styles.buttonText}>Reiniciar Escaneo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2b5983'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FFB820',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, 
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    marginTop: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#2b5983',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
