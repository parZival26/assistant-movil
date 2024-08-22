import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createEvent } from '../../services/apiService'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const schema = yup.object().shape({
  title: yup.string().required('El título es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  initialDate: yup.date().required('La fecha inicial es obligatoria'),
  finalDate: yup.date().required('La fecha final es obligatoria'),
  speaker: yup.string().required('El orador es obligatorio'),
  location: yup.string().required('La ubicación es obligatoria'),
});

export default function CreateEventScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const [showInitialDatePicker, setShowInitialDatePicker] = useState(false);
  const [showFinalDatePicker, setShowFinalDatePicker] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const result = await createEvent(data);
      if ('error' in result) {
        Alert.alert('Error', result.error);

      } else {
        Alert.alert('Evento creado', 'El evento ha sido creado exitosamente');
        navigation.goBack();
      }

      
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al crear el evento');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Uassistance</ThemedText>
        <Image
          source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Crear Evento</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="Título del evento"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
        
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.description && styles.inputError, styles.descriptionInput]}
              placeholder="Descripción del evento"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />
        {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
        
        <Controller
          control={control}
          name="initialDate"
          render={({ field: { onChange, value } }) => (
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => setShowInitialDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{value ? value.toDateString() : 'Seleccionar Fecha Inicial'}</Text>
              </TouchableOpacity>
              {showInitialDatePicker && (
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowInitialDatePicker(false);
                      onChange(selectedDate || value);
                    }}
                  />
                </View>
              )}
            </View>
          )}
        />
        {errors.initialDate && <Text style={styles.error}>{errors.initialDate.message}</Text>}
        
        <Controller
          control={control}
          name="finalDate"
          render={({ field: { onChange, value } }) => (
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => setShowFinalDatePicker(true)} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{value ? value.toDateString() : 'Seleccionar Fecha Final'}</Text>
              </TouchableOpacity>
              {showFinalDatePicker && (
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowFinalDatePicker(false);
                      onChange(selectedDate || value);
                    }}
                  />
                </View>
              )}
            </View>
          )}
        />
        {errors.finalDate && <Text style={styles.error}>{errors.finalDate.message}</Text>}
        
        <Controller
          control={control}
          name="speaker"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.speaker && styles.inputError]}
              placeholder="Orador"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.speaker && <Text style={styles.error}>{errors.speaker.message}</Text>}
        
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.location && styles.inputError]}
              placeholder="Ubicación"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Guardar Evento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff', 
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: '10%',
    marginTop: '5%'
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
  formContainer: {
    width: '100%',
    maxWidth: 600, 
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center', 
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: {
    borderColor: 'red',
  },
  descriptionInput: {
    paddingVertical: 12, 
    textAlignVertical: 'top', 
  },
  dateContainer: {
    width: '100%',
    marginBottom: 16,
  },
  dateButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dateButtonText: {
    color: '#333',
  },
  datePickerWrapper: {
    marginTop: '5%',
    marginBottom: '1%', 
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  submitButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b5983',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
