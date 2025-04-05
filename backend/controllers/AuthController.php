<?php
require_once '../models/Usuario.php';
require_once '../config/database.php';
require_once '../config/cors.php';


header('Content-Type: application/json');

// CONTROLADOR - REGISTRO Y LOGIN DEL USUARIO
class AuthController {
    private $usuarioModel;

    public function __construct($pdo) {
        $this->usuarioModel = new Usuario($pdo);
    }

    // REGISTRO DE USUARIO
    public function register($data) {
        if (!isset($data['nombre'], $data['usuario'], $data['email'], $data['clave']) || 
            trim($data['nombre']) === "" || trim($data['usuario']) === "" || trim($data['email']) === "" || trim($data['clave']) === "") {
            http_response_code(400);
            echo json_encode(["error" => "Todos los campos son obligatorios"]);
            exit();
        }
        
        // Verificar si el nombre tiene solo letras, permite espacios dentro, pero no al principio o final
        $nombre = trim($data['nombre']);

        // Verificar si tiene caracteres no permitidos (solo letras y espacios)
        if (!preg_match('/^[a-zA-Z\s]+$/', $nombre)) {
            http_response_code(409);
            echo json_encode(["error" => "El nombre solo debe contener letras y espacios entre palabras, sin espacios al principio o al final"]);
            exit();
        }

        // Convertir la primera letra de cada palabra a mayúscula y el resto a minúscula
        $nombreFormateado = ucwords(strtolower($nombre));

        // Guardar el nombre formateado
        $data['nombre'] = $nombreFormateado;
    
        // Validar el formato del correo electrónico
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "El correo electrónico no es válido"]);
            exit();
        }
    
        // Verificar si el nombre de usuario ya está registrado
        if ($this->usuarioModel->usuarioExistePorUsuario($data['usuario'])) {
            http_response_code(409);
            echo json_encode(["error" => "El nombre de usuario ya está registrado"]);
            exit();
        }
    
        // Verificar si el correo electrónico ya está registrado
        if ($this->usuarioModel->usuarioExistePorEmail($data['email'])) {
            http_response_code(409);
            echo json_encode(["error" => "El correo electrónico ya está registrado"]);
            exit();
        }

        // Verificar si la contraseña ingresada es válida
        if ($this->usuarioModel->validarContrasenia($data['clave'])==false){
            http_response_code(409);
            echo json_encode(["error" => "La contraseña debe contener números, letras (incluyendo al menos una mayúscula) y caracteres especiales."]);
            exit();
        }
    
        // Encriptar la contraseña
        $clave = password_hash($data['clave'], PASSWORD_BCRYPT);
    
        // Crear un nuevo usuario
        if ($this->usuarioModel->crearUsuario($data['nombre'], $data['usuario'], $data['email'], $clave)) {
            http_response_code(201);
            return ["message" => "Usuario registrado exitosamente"];
        } else {
            http_response_code(500);
            return ["error" => "Error al registrar el usuario"];
        }
    }
    
    

    // LOGIN DE USUARIO
    public function login() {
        //session_start();
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email'], $data['clave'])) {
            http_response_code(400);
            echo json_encode(["error" => "Todos los campos son obligatorios"]);
            return;
        }

        // Obtener usuario
        $usuario = $this->usuarioModel->obtenerUsuarioPorEmail($data['email']);
        if (!$usuario || !password_verify($data['clave'], $usuario['clave'])) {
            http_response_code(401);
            echo json_encode(["error" => "Credenciales incorrectas"]);
            return;
        }

        // Iniciar sesión y guardar usuario
        //$_SESSION['usuario'] = [
          //  'id' => $usuario['id'],
          //  'nombre' => $usuario['nombre'],
          //  'usuario' => $usuario['usuario'],
           // 'email' => $usuario['email']
       // ];

        http_response_code(200);
        echo json_encode(["message" => "Inicio de sesión exitoso"]);
        
    }

    // CERRAR SESIÓN
    public function logout() {
        //session_start();
        session_destroy();
        http_response_code(200);
        echo json_encode(["message" => "Sesión cerrada"]);
    }

    // VERIFICAR SESIÓN ACTIVA
    public function checkSession() {
        //session_start();
        if (isset($_SESSION['usuario'])) {
            http_response_code(200);
            echo json_encode(["usuario" => $_SESSION['usuario']]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "No hay sesión activa"]);
        }
    }
}
?>
