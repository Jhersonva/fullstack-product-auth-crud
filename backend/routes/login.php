<?php
require_once '../controllers/AuthController.php';
require_once '../config/database.php';
require_once '../config/cors.php';

header("Content-Type: application/json");
//session_start(); // Iniciar sesión antes de interactuar con el controlador

// Capturar JSON enviado desde el cliente
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Depurar los datos recibidos
//var_dump($data);

$authController = new AuthController($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pasar los datos decodificados al controlador
    $authController->login($data);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $authController->checkSession();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
