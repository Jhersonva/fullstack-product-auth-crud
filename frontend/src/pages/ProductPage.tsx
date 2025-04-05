  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { FaEdit, FaTrash } from 'react-icons/fa';
  import SidebarProductos from '../components/Sidebar';
  import '../styles/ProductPage.css';
  import { useProductos, Product } from '../hooks/useProductos';
  

  const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Se asume que useProductos devuelve products, loading, error y deleteProduct
    const { products, loading, error, deleteProduct } = useProductos(searchTerm);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleAddProduct = () => {
      navigate('/agregar');
    };

    const handleDelete = async (id: string) => {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        console.error('Error deleting product:', err);
      }
    };

    return (
      <div className="app-container">
        <SidebarProductos />
        <div className="main-content">
          <header className="header">
            <h1>PRODUCTOS</h1>
          </header>

          <div className="content">
            <div className="actions">
            <div className="search-bar">
          <input
              type="text"
              placeholder="Buscar producto por ID o nombre..."
              value={searchTerm}
              onChange={handleSearch}
          />
      </div>
              <button className="add-button" onClick={handleAddProduct}>
                Agregar
              </button>
            </div>

            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className="table-scroll">
                <div className="product-table">
                  <div className="table-header">
                    <div className="column-id">ID</div>
                    <div className="column-name">Nombre</div>
                    <div className="column-description">Descripción</div>
                    <div className="column-price">Precio</div>
                    <div className="column-category">Categoría</div>
                    <div className="column-stock">Stock</div>
                    <div className="column-actions">Acciones</div>
                  </div>

                  {products.map((product: Product) => (
                    <div key={product.id} className="product-row">
                      <div className="column-id">{product.id}</div>
                      <div className="column-name">{product.nombre}</div>
                      <div className="column-description">{product.descripcion}</div>
                      <div className="column-price">$ {product.precio}</div>
                      <div className="column-category">{product.categoria}</div>
                      <div className="column-stock">{product.stock}</div>
                      <div className="column-actions">
                        <button
                          className="edit-button"
                          onClick={() => navigate(`/editar/${product.id}`)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ProductPage;
