<?php

require_once 'config/database.php';
require_once 'config/cors.php';

echo json_encode(["message" => "API funcionando"]);


trigger_error("Este es un error de prueba", E_USER_WARNING);

?>