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

  export const createEvent = async (event: Event, token: string) => {
    try {
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