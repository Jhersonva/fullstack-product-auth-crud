import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage'; 
import LoginPage from '../pages/LoginPage';
import AddProductPage from '../pages/AddProductPage';
import RegisterPage from '../pages/RegisterPage';
import EditProductPage from '../pages/EditProductPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route path="/productos" element={<ProductPage />} />
        <Route path="/agregar" element={<AddProductPage />} />
        <Route path="/editar/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
