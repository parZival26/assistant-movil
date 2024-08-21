import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createEvent } from '../../services/apiService'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const onSubmit = async (data) => {
    try {
      await createEvent(data);
      Alert.alert('Evento creado', 'El evento ha sido creado exitosamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al crear el evento');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Evento</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Título del evento"
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
            style={[styles.input, errors.description && styles.inputError]}
            placeholder="Descripción del evento"
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
          <>
            <TouchableOpacity onPress={() => setShowInitialDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>{value ? value.toDateString() : 'Seleccionar Fecha Inicial'}</Text>
            </TouchableOpacity>
            {showInitialDatePicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowInitialDatePicker(false);
                  onChange(selectedDate || value);
                }}
              />
            )}
          </>
        )}
      />
      {errors.initialDate && <Text style={styles.error}>{errors.initialDate.message}</Text>}
      
      <Controller
        control={control}
        name="finalDate"
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity onPress={() => setShowFinalDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>{value ? value.toDateString() : 'Seleccionar Fecha Final'}</Text>
            </TouchableOpacity>
            {showFinalDatePicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFinalDatePicker(false);
                  onChange(selectedDate || value);
                }}
              />
            )}
          </>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: {
    borderColor: 'red',
  },
  dateButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
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
  error: {
    color: 'red',
    marginBottom: 16,
  },
  submitButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
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