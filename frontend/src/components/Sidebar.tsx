// components/SidebarProductos.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash, FaBars } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import "../styles/Sidebar.css";
import { useAuth } from "../hooks/useAuth"; 

const SidebarProductos = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { logout, loading, error } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("Sidebar abierto:", !isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const menuItems = [
    { nombre: "Productos", icono: <MdOutlineInventory size={20} />, ruta: "/productos" },
  ];

  return (
    <>
      {/* Botón de hamburguesa */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Sidebar con clases dinámicas */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.nombre}
              to={item.ruta}
              className={`sidebar-item ${location.pathname === item.ruta ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icono}
              <span>{item.nombre}</span>
            </Link>
          ))}

          {/* Botón de cerrar sesión */}
          <button
            className="logout-button"
            onClick={handleLogout}
            disabled={loading}
          >
            <FaTrash size={18} />
            <span>{loading ? "Cerrando sesión..." : "Cerrar sesión"}</span>
          </button>

          {error && <p className="error-message">{error}</p>}
        </nav>
      </div>
    </>
  );
};

export default SidebarProductos;
