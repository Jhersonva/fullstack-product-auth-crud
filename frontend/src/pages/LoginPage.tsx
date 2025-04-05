// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, error, loading } = useAuth(); 
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); 
    setMensaje(error || ''); 
  };
  

  return (
    <div className="app-container">
      <div className="left-section">
        <img src="/logo.png" alt="Corporation Logo" className="logo" />
        <h1>EN CORPORATION</h1>
        <h2>JUAREZ TECHNOLOGY,</h2>
        <h3>TU MEJOR OPCIÓN</h3>
        <div className="rocket-container">
          <img src="/inicio.png" alt="inicio" className="inicio" />
        </div>
      </div>

      <div className="right-section">
        <div className="login-container">
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo"
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <div className="form-footer">
              <a href="/registrar" className="register-link">¿No tiene aún una cuenta? Regístrese aquí</a>
              <button type="submit" className="login-button" disabled={loading}> 
                {loading ? 'Cargando...' : 'Iniciar Sesión'} 
              </button>
            </div>
          </form>
          {mensaje && <p>{mensaje}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
