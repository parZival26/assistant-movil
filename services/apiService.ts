import AsyncStorage from "@react-native-async-storage/async-storage";

// src/services/apiService.ts
const BASE_URL = 'http://tuquio.com/assistant/api';

interface Event {
    title: string;
    description: string;
    initialDate: string;
    finalDate: string;
    speaker: string;
    location: string;
  }


interface Login {
  username: string;
  password: string;  
}

export const login  = async (login: Login) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });
    if (!response.ok) {
      console.log('Error logging in:', response.status);
      
      return { error: 'Usuario o contraseña incorrectos' };
    }
    const data = await response.json();
    await AsyncStorage.setItem('access', data.accessToken);
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('access');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const createEvent = async (event: Event) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Error al crear el evento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};