<?php 
require_once '../../config/database.php';
require_once '../../config/cors.php';
require_once '../../controllers/ProductoController.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$controller = new ProductoController($pdo);

try {
    switch ($method) {
        case 'OPTIONS':
            http_response_code(200);
            exit;
        
        case 'GET':
            if (isset($_GET['categorias'])) {
                $controller->obtenerCategorias();
            } elseif (isset($_GET['id'])) {
                $controller->obtenerPorId($_GET['id']);
            } else {
                $controller->listar();
            }
            break;

        case 'POST':
            // Obtener los datos del cuerpo de la solicitud
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                throw new Exception("El cuerpo de la solicitud está vacío o no es JSON válido", 400);
            }
            // Llamar al controlador para crear un nuevo producto
            $controller->crear($data);
            break;

        case 'PUT':
            // Validar que el ID esté presente y sea un valor numérico
            if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
                throw new Exception("Falta un ID válido en la URL", 400);
            }

            // Obtener los datos del cuerpo de la solicitud PUT
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                throw new Exception("El cuerpo de la solicitud está vacío o no es JSON válido", 400);
            }

            // Validar que los campos requeridos estén presentes
            if (!isset($data['nombre'], $data['descripcion'], $data['precio'], $data['categoria'], $data['stock'])) {
                throw new Exception("Faltan datos obligatorios", 400);
            }

            // Llamar al controlador para actualizar el producto
            $controller->actualizar($_GET['id'], $data);
            break;

        case 'DELETE':
            // Validar que el ID esté presente en la URL
            if (!isset($_GET['id'])) {
                throw new Exception("Falta el ID en la URL", 400);
            }
            // Llamar al controlador para eliminar el producto
            $controller->eliminar($_GET['id']);
            break;

        default:
            // Si el método no es permitido, devolver error 405
            throw new Exception("Método no permitido", 405);
    }
} catch (Exception $e) {
    // En caso de error, devolver el código de estado adecuado y el mensaje de error
    http_response_code($e->getCode() ?: 500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
