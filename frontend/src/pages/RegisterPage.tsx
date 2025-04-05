// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import '../styles/RegisterPage.css';
import { useRegister } from '../hooks/useRegister';

interface FormErrors {
  nombre?: string;
  usuario?: string;
  clave?: string;
  correo?: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    clave: '',
    correo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { loading, error, message, register } = useRegister();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nombre':
        return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
      case 'usuario':
        return !/^[a-zA-Z0-9_]{3,20}$/.test(value)
          ? 'El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos'
          : '';
      case 'clave':
        return value.length < 6
          ? 'La clave debe tener al menos 6 caracteres'
          : !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
          ? 'La clave debe contener al menos una letra mayúscula, una minúscula y un número'
          : '';
      case 'correo':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Por favor ingrese un correo electrónico válido'
          : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      // Llama a la función register del hook
      await register(
        formData.nombre,
        formData.usuario,
        formData.correo,
        formData.clave
      );
    } else {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    }
  };

  const getInputStatus = (fieldName: string) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName as keyof FormErrors] ? 'error' : 'success';
  };

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <div className="company-info">
          <img src="/logo.png" alt="Corporation Logo" className="logo" />
          <h1 className="company-title">EN CORPORATION</h1>
          <h2 className="company-subtitle">JUAREZ TECHNOLOGY,</h2>
          <h3 className="company-subtitle">TU MEJOR OPCIÓN</h3>
        </div>
        <div className="image-container">
          <img src="/inicio.png" alt="inicio" className="inicio" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <h2 className="form-title">REGISTRO</h2>
          <form onSubmit={handleSubmit} className="form" noValidate>
            <div className="form-group">
              <label className="form-label">Nombre:</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${getInputStatus('nombre')}`}
                  placeholder="Ingrese su nombre"
                />
                {getInputStatus('nombre') === 'success' && <Check className="status-icon success" />}
                {getInputStatus('nombre') === 'error' && <AlertCircle className="status-icon error" />}
              </div>
              {touched.nombre && errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Usuario:</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${getInputStatus('usuario')}`}
                  placeholder="Ingrese usuario"
                />
                {getInputStatus('usuario') === 'success' && <Check className="status-icon success" />}
                {getInputStatus('usuario') === 'error' && <AlertCircle className="status-icon error" />}
              </div>
              {touched.usuario && errors.usuario && <span className="error-message">{errors.usuario}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Correo:</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${getInputStatus('correo')}`}
                  placeholder="Ingrese correo"
                />
                {getInputStatus('correo') === 'success' && <Check className="status-icon success" />}
                {getInputStatus('correo') === 'error' && <AlertCircle className="status-icon error" />}
              </div>
              {touched.correo && errors.correo && <span className="error-message">{errors.correo}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Clave:</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="clave"
                  value={formData.clave}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${getInputStatus('clave')}`}
                  placeholder="Ingrese Clave"
                />
                {getInputStatus('clave') === 'success' && <Check className="status-icon success" />}
                {getInputStatus('clave') === 'error' && <AlertCircle className="status-icon error" />}
              </div>
              {touched.clave && errors.clave && <span className="error-message">{errors.clave}</span>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Registrar'}
            </button>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
