# Sistema de gestión de productos fullstack con autenticación

Un sistema de gestión de productos con funcionalidades de inicio de sesión, registro y CRUD, desarrollado utilizando **PHP** (REST API) para el backend y **React**, **Vite** y **TypeScript** para el frontend. 🚀

## Descripción

Este proyecto es una aplicación web fullstack que permite gestionar productos en una tienda virtual. Los usuarios pueden crear una cuenta, iniciar sesión y gestionar productos de manera sencilla. La aplicación sigue el enfoque de arquitectura RESTful para el backend y utiliza tecnologías modernas para el frontend.

### Características

- Registro y autenticación de usuarios.
- Gestión de productos (Crear, Leer, Actualizar, Eliminar).
- CRUD completo de productos.
- Interfaz de usuario reactiva construida con React, Vite y TypeScript.
- Backend con PHP implementando una API RESTful.
  
## Tecnologías utilizadas

### Frontend:
- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción de frontend rápida y moderna.
- **TypeScript**: Superset de JavaScript que permite un desarrollo más seguro y escalable.

### Backend:
- **PHP**: Lenguaje de programación utilizado para crear la API RESTful.
- **MySQL**: Base de datos relacional para almacenar usuarios y productos.
- **REST API**: Arquitectura de servicios web para comunicación entre el frontend y el backend.

### Otros:
- **Postman**: Herramienta utilizada para realizar pruebas de la API.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jhersonva/fullstack-product-auth-crud.git
```

### 2. Configurar el backend (PHP)

- Asegúrate de tener **PHP 7.4 o superior** instalado en tu máquina.
- Configura tu base de datos MySQL y crea una base de datos llamada `api_v2`.
- Importa el archivo `backend/db/schema.sql` para crear las tablas necesarias.

### 3. Configurar el frontend

- Asegúrate de tener **Node.js** y **npm** instalados.
- Navega al directorio del frontend:

```bash
cd frontend
```

- Instala las dependencias:

```bash
npm install
```

### 4. Ejecutar el proyecto

Para iniciar el backend:

```bash
php -S localhost:8000 -t backend/
```

Para ejecutar el frontend (React):

```bash
npm run dev
```

Ahora puedes acceder a la aplicación desde tu navegador en `http://localhost:3000` para el frontend y `http://localhost:8000` para la API RESTful del backend.

## Uso

- **Registro**: Los usuarios pueden crear una cuenta proporcionando un nombre de usuario, correo electrónico y contraseña.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión utilizando sus credenciales y obtener un token JWT para realizar operaciones autenticadas.
- **Gestión de productos**: Los usuarios autenticados pueden ver, agregar, editar y eliminar productos desde la interfaz del frontend.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes hacer un fork del repositorio y enviar un pull request con tus cambios.

### Pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b mi-rama`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva característica'`).
4. Sube los cambios a tu fork (`git push origin mi-rama`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
