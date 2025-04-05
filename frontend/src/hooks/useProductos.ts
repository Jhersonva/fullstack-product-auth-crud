// src/hooks/useProductos.ts
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost/api/routes';

// Define una interfaz para los productos
export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
}

interface UseProductosResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  updateProduct: (id: string, productData: Omit<Product, 'id'>) => Promise<Product>;
}

export const useProductos = (searchTerm: string): UseProductosResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    // Nueva función para obtener los producto
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `${API_BASE_URL}/productos/`;

        if (searchTerm) {
          url += `?buscar=${searchTerm}`;
        }

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data) {
          setProducts([data]);
        } else {
          setProducts([]);
        }

      } catch (err: any) {
        setError(err.message || 'Error al obtener los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  // Nueva función para eliminar un producto
  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/?id=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
  
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el producto');
    }
  };
  
  // Nueva función para agregar un producto
  const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/productos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const text = await response.text();
      console.log("Respuesta del servidor:", text);

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }

      const newProduct: Product = JSON.parse(text || '{}');
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      return newProduct;
    } catch (err: any) {
      setError(err.message || 'Error al agregar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Nueva función para obtener un producto por id
  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/?id=${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }

      const product: Product = await response.json();
      return product;
    } catch (err: any) {
      setError(err.message || 'Error al obtener el producto');
      return null;
    }
  };

  // Nueva función para actualizar un producto
  const updateProduct = async (id: string, productData: Omit<Product, 'id'>): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/productos/?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const text = await response.text();
      console.log("Respuesta del servidor:", text);

      if (!response.ok) {
        throw new Error(`Error al actualizar el producto: ${response.statusText}`);
      }

      const updatedProduct: Product = JSON.parse(text || '{}');
      setProducts((prevProducts) => prevProducts.map((product) =>
        product.id === id ? updatedProduct : product
      ));

      return updatedProduct;
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, addProduct, deleteProduct, getProductById, updateProduct };
};
