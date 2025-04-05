// src/hooks/useRegister.ts
import { useState } from 'react';

const API_BASE_URL = 'http://localhost/api/routes'; // URL base de la API

interface RegisterResponse {
  message?: string;
  error?: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Nueva función para crear un usuario
  const register = async (
    nombre: string,
    usuario: string,
    email: string,
    clave: string
  ): Promise<RegisterResponse> => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, usuario, email, clave }),
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }

      setMessage(data.message || 'Usuario registrado exitosamente');
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al registrar el usuario');
      return { error: err.message || 'Error al registrar el usuario' };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, message, register };
};
