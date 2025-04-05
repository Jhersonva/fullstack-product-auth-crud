<?php
class Producto {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function obtenerProductos() {
        try {
            $stmt = $this->pdo->query("SELECT * FROM productos");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function obtenerProductoPorIdONombre($valor) {
        try {
            $stmt = is_numeric($valor) ?
                $this->pdo->prepare("SELECT * FROM productos WHERE id = ?") :
                $this->pdo->prepare("SELECT * FROM productos WHERE LOWER(nombre) = LOWER(?)");
            
            $stmt->execute([$valor]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function crearProducto($nombre, $descripcion, $precio, $categoria, $stock) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES (?, ?, ?, ?, ?)");
            return $stmt->execute([$nombre, $descripcion, $precio, $categoria, $stock]);
        } catch (PDOException $e) {
            return false;
        }
    }

    public function actualizarProducto($id, $nombre, $descripcion, $precio, $categoria, $stock) {
    $sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?";
    $stmt = $this->pdo->prepare($sql);

    $resultado = $stmt->execute([$nombre, $descripcion, $precio, $categoria, $stock, $id]);

    // Agregar un chequeo más detallado para errores
    if (!$resultado) {
        $errorInfo = $stmt->errorInfo();
        return ["error" => "Error al actualizar: " . $errorInfo[2]];
    }

    return $resultado; // Devuelve true si la consulta fue exitosa
}




    public function eliminarProducto($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM productos WHERE id = ?");
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>
