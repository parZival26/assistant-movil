import { User } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Attendance } from '@/interfaces/Attendace';

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
      const errorData = await response.json(); // Extrae el cuerpo de la respuesta como JSON
      console.log(errorData);
      let errorMessage: string
      //check if errorData is an array
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }

       
      console.log('Error logging in:', errorMessage);
      
      
      return { error: errorMessage };
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
      const errorData = await response.json(); // Extrae el cuerpo de la respuesta como JSON
      let errorMessage: string
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }
      
      return { error: errorMessage };
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
      const errorData = await response.json();
      let errorMessage: string
      //check if errorData is an array
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }
      console.log('Error fetching event:', errorMessage);
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
      const errorData = await response.json();
      let errorMessage: string
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }
      return { error: errorMessage };
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
      const errorData = await response.json(); // Extrae el cuerpo de la respuesta como JSON
      const errorMessage = errorData.message || 'Error desconocido';
      console.log('Error getting QR:', response.status);

      return { error: errorMessage };

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

export const getEventUsers = async (eventId: Number): Promise<Attendance[] | { error: string }> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/assistance/eventUsers/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage: string
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }
      return { error: errorMessage };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching event users:', error);
    return { error: 'Error de red' };
  }
};

export const getAssistanceByEvent = async (eventId: number): Promise<any[] | { error: string }> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    const response = await fetch(`${BASE_URL}/assistance/assistanceByEvent/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();   
 // Extrae el cuerpo de la respuesta como JSON
      let errorMessage: string;
      if (errorData.message instanceof Array) {
        errorMessage = errorData.message.join(', ');
      } else {
        errorMessage = errorData.message || 'Error desconocido';
      }
      console.log('Error fetching assistance:', errorMessage);
      return { error: errorMessage };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching assistance by event:', error);
    throw error;
  }
};
