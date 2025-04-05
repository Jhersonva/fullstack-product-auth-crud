<?php 
header("Access-Control-Allow-Origin: *"); // Permitir todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
require_once __DIR__ . '/../models/Producto.php';

//session_start();
// CONTROLADOR - CRUD PRODUCTOS
class ProductoController {
    private $productoModel;

    public function __construct($pdo) {
    // session_start();  // No es necesario si no usas sesiones
    $this->productoModel = new Producto($pdo);
}


    public function listar() {
        $buscar = isset($_GET['buscar']) ? trim($_GET['buscar']) : null;
    
        if ($buscar) {
            $productos = $this->productoModel->obtenerProductoPorIdONombre($buscar);
            if ($productos) {
                http_response_code(200);
                echo json_encode($productos);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Producto no encontrado"]);
            }
        } else {
            $productos = $this->productoModel->obtenerProductos();
            http_response_code(200);
            echo json_encode($productos ?: ["error" => "No hay productos disponibles"]);
        }
    }

    public function obtenerPorId($id) {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            return;
        }
        $producto = $this->productoModel->obtenerProductoPorIdONombre($id);
        http_response_code($producto ? 200 : 404);
        echo json_encode($producto ?: ["error" => "Producto no encontrado"]);
    }
    
    public function obtenerCategorias() {
    $categorias = [
        'Productos técnicos mecánicos',
        'Productos técnicos digitales o informáticos',
        'Productos tecnológicos manuales',
        'Productos técnicos artesanales'
    ];

    http_response_code(200);
    echo json_encode($categorias);
}


    public function crear($data) {
        if (!isset($data['nombre'], $data['descripcion'], $data['precio'], $data['categoria'], $data['stock'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos requeridos"]);
            return;
        }

        $categorias_validas = [
            'Productos técnicos mecánicos',
            'Productos técnicos digitales o informáticos',
            'Productos tecnológicos manuales',
            'Productos técnicos artesanales'
        ];

        if (!is_string($data['nombre']) || !is_string($data['descripcion']) || 
            !is_numeric($data['precio']) || $data['precio'] <= 0 ||
            !in_array($data['categoria'], $categorias_validas) ||
            !is_numeric($data['stock']) || $data['stock'] < 0) {
            
            http_response_code(422);
            echo json_encode(["error" => "Datos inválidos"]);
            return;
        }

        //$usuario_id = $_SESSION['usuario']['id'];
        $resultado = $this->productoModel->crearProducto(
            $data['nombre'], $data['descripcion'], floatval($data['precio']), $data['categoria'], $data['stock']
        );

        http_response_code($resultado ? 201 : 500);
        echo json_encode(["message" => $resultado ? "Producto creado exitosamente" : "Error al crear el producto"]);
    }

  public function actualizar($id, $data) {
    if (!is_numeric($id)) {
        http_response_code(400);
        echo json_encode(["error" => "ID inválido"]);
        return;
    }
    // Verificar si el producto existe
    $productoExistente = $this->productoModel->obtenerProductoPorIdONombre($id);
    if (!$productoExistente) {
        http_response_code(404);
        echo json_encode(["error" => "Producto no encontrado"]);
        return;
    }

    // Validar datos obligatorios
    if (!isset($data['nombre'], $data['descripcion'], $data['precio'], $data['categoria'], $data['stock'])) {
        http_response_code(400);
        echo json_encode(["error" => "Faltan datos"]);
        return;
    }

    // Validar tipos de datos y valores permitidos
    $categorias_validas = [
        'Productos técnicos mecánicos',
        'Productos técnicos digitales o informáticos',
        'Productos tecnológicos manuales',
        'Productos técnicos artesanales'
    ];

    if (!is_string($data['nombre']) || !is_string($data['descripcion']) || 
        !is_numeric($data['precio']) || $data['precio'] <= 0 ||
        !in_array($data['categoria'], $categorias_validas) ||
        !is_numeric($data['stock']) || $data['stock'] < 0) {
        
        http_response_code(422);
        echo json_encode(["error" => "Datos inválidos"]);
        return;
    }

    // Llamar al modelo para actualizar el producto
    $resultado = $this->productoModel->actualizarProducto(
        $id, $data['nombre'], $data['descripcion'], $data['precio'], $data['categoria'], $data['stock']
    );

    http_response_code($resultado ? 200 : 500);
    echo json_encode(["message" => $resultado ? "Producto actualizado correctamente" : "Error al actualizar el producto"]);
}




    public function eliminar($id) {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            return;
        }

        // Verificar si el producto existe antes de intentar eliminarlo
        $productoExistente = $this->productoModel->obtenerProductoPorIdONombre($id);
        if (!$productoExistente) {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
            return;
        }

        $resultado = $this->productoModel->eliminarProducto($id);

        http_response_code($resultado ? 200 : 500);
        echo json_encode(["message" => $resultado ? "Producto eliminado correctamente" : "Error al eliminar el producto"]);
    }
}
?>
