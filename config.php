<?php
$host = "localhost";
$user = "roor";
$pass = "" //senha o my sql se tiver  
$db = "usuarios";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error) {
    die("Falha na Conexão: ".  $conn->connect_error);
}
?>