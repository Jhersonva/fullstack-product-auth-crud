<?php

// CONEXION A LA BASE DE DATOS

$host = "localhost";
$db_name = "api_v2";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host; port=3306; dbname=$db_name;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Conexión fallida: " . $e->getMessage()]);
    exit;
}
?>
