<?php
require_once '../controllers/AuthController.php';
require_once '../config/database.php';
require_once '../config/cors.php';

header("Content-Type: application/json");
session_start();

$authController = new AuthController($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authController->logout();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
