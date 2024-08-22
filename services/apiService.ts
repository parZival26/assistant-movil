import { User } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

// src/services/apiService.ts
const BASE_URL = 'http://tuquio.com/assistant/api';

enum Status {
  starting_soon = 'starting_soon',
  ongoing = 'ongoing',
  finished = 'finished',
}

interface Event {
  id: number
  title: string;
  description: string;
  initialDate: string;
  finalDate: string;
  speaker: string;
  location: string;
  status: Status;
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

interface UserEvents {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  speaker: string;
}

export const getUserEvents = async (): Promise<Event[] | { error: string }> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/event/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log('Error fetching user events:', response.status);
      return { error: 'Error al obtener los eventos del usuario' };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    return { error: 'Error de red' };
  }
};


export const getEvent = async (id: string): Promise<Event | { error: string }> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log('Error fetching event:', response.status);
      return { error: 'Error al obtener el evento' };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching event:', error);
    return { error: 'Error de red' };
  }
}; 

export const getUsers = async (): Promise<User[] | { error: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
    });

    if (!response.ok) {
      console.log('Error fetching users:', response.status);
      return { error: 'Error al obtener los usuarios' };
    }

    const data = await response.json();
    return data;


  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: 'Error de red' };
  }
};

export const addUserEvent = async (eventId: number, userId: number[]) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/assistance/addUserToEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ users: userId, event: eventId }),
    });

    if (!response.ok) {
      console.log('Error adding users to event:', response.status);
      return { error: 'Error al agregar usuarios al evento' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding users to event:', error);
    throw error;
  }
}

export const ValidateQrCode = async (qrCode: string): Promise<{message: string} | { error: string }> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/assistance/validateQrCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ qrCode }),
    });

    if (!response.ok) {
      if (response.status === 422) {
        return { error: 'El código QR no es válido' };
      }
      return { error: 'Error al validar el código QR' + response.status };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating qr code:', error);
    throw error;
  }

}

export const getUserQr = async (eventId: number): Promise<{qrCodeDataURL: string} | {error:string}>  => {
  try {
    const token = await AsyncStorage.getItem('access')
    console.log('Token:', token);
    
    const response = await  fetch(`${BASE_URL}/assistance/generateQR/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log('Error getting QR:', response.status);

      if (response.status === 422) {
        return { error: 'El evento no existe' };
      }
      
      return { error: 'Error al obtener el QR ' + response.status };
    }

    console.log('Response:', response);
    

    const data = await response.json();
    console.log('Data:', data);
    return data;

  } catch (error) {
    console.error('Error getting QR:', error);
    throw error;
  }
  

}