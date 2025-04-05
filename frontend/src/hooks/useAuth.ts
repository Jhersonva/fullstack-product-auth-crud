// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

//const API_BASE_URL = 'https://dev.cjtech.me/api/routes'; // URL base de la API en deploy
const API_BASE_URL = 'http://localhost/api/routes'; // URL base de la API

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({ email, clave: password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }
  
      setUser(data);
      navigate('/productos'); 
      return data;
    } catch (error: any) {
      setError(error.message);
      console.error('Error al iniciar sesión:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/logout.php`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cerrar sesión');
      }

      setUser(null); 
      navigate('/'); 
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cerrar sesión');
      return { error: err.message || 'Error al cerrar sesión' };
    } finally {
      setLoading(false);
    }
  };

  return { user, login, logout, error, loading };
};
