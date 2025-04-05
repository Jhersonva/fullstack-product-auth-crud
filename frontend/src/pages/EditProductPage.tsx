import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarProductos from '../components/Sidebar';
import '../styles/AddProductPage.css';
import { Product } from '../hooks/useProductos';

const API_BASE_URL = 'http://localhost/api/routes';

const EditarProductoPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar el producto existente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/productos/index.php?id=${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const product: Product = await response.json();
        setFormData({
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio.toString(),
          categoria: product.categoria,
          stock: product.stock.toString(),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

     // Cargar la categoria del producto
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

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct: Omit<Product, 'id'> = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        stock: parseInt(formData.stock, 10),
      };

      const response = await fetch(`${API_BASE_URL}/productos/index.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      navigate('/productos');
    } catch (err) {
      console.error('Error al actualizar producto:', err);
    }
  };

  const handleCancel = () => {
    navigate('/productos'); 
  };

  return (
    <div className="app-container">
      <SidebarProductos />
      <div className="main-content">
        <div className="header">
          <h1>EDITAR PRODUCTO</h1>
        </div>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarProductoPage;
