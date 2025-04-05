import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarProductos from '../components/Sidebar';
import '../styles/AddProductPage.css';
import { useProductos, Product } from '../hooks/useProductos';

const API_BASE_URL = 'http://localhost/api/routes';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
  });
  const [categories, setCategories] = useState<string[]>([]);

  const navigate = useNavigate();
  const { addProduct, loading, error } = useProductos('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/productos/?categorias`);
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        setCategories(data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);
  
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct: Omit<Product, 'id'> = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        stock: parseInt(formData.stock, 10),
        //usuario_id: formData.usuario_id
      };
      await addProduct(newProduct);
      navigate('/productos');
    } catch (err) {
      console.error('Error al crear producto:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  return (
    <div className="app-container">
      <SidebarProductos />
      <div className="main-content">
        <div className="header">
          <h1>AGREGAR PRODUCTO</h1>
        </div>
        <div className="form-container">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del producto</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input type="text" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
                <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange}>
                  <option value="">Selecciona categoría</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
              <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
              {error && <p className="error-message">Error: {error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
