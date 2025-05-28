<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Conectar ao banco de dados
$servername = "sql107.infinityfree.com";
$username = "if0_39088240";
$password = "Dp8jqJ7CKIv2";
$dbname = "if0_39088240_XXX";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Pegar os dados do formulário
$nome = $_POST['nome'];
$contato = $_POST['contato'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$endereco = $_POST['endereco'];
$cidade = $_POST['cidade'];
$cep = $_POST['cep'];

// Verificar se o e-mail já existe
$check_sql = "SELECT id FROM usuarios WHERE email = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("s", $email);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    // Redireciona com erro de e-mail duplicado
    header("Location: registro.html?erro=1");
    $check_stmt->close();
    $conn->close();
    exit();
}
$check_stmt->close();

// Inserir no banco de dados
$sql = "INSERT INTO usuarios (nome, contato, email, senha, endereco, cidade, cep)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $nome, $contato, $email, $senha, $endereco, $cidade, $cep);

if ($stmt->execute()) {
    header("Location: ../login/login.html");
    exit();
} else {
    // Redireciona com erro genérico
    header("Location: registro.html?erro=2");
    exit();
}

$stmt->close();
$conn->close();
?>