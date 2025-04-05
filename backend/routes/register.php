<?php
require_once '../controllers/AuthController.php';
require_once '../config/database.php';
require_once '../config/cors.php';

header("Content-Type: application/json");

//APIREST = http://localhost/api-v2/routes/register.php

$authController = new AuthController($pdo);

// Obtener los datos JSON de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si los datos están correctamente decodificados
if ($data === null) {
    http_response_code(40); 
    echo json_encode(["error" => "Datos inválidos o no proporcionados"]);
    exit();
}

// Verifica si la solicitud es POST y maneja el registro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($authController->register($data)); 
} else {
    http_response_code(405); 
    echo json_encode(["error" => "Método no permitido"]);
}
?>
