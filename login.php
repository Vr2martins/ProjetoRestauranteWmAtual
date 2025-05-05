
<?php
session_start(); // Inicia a sessão

// Inclui a conexão com o banco
include('config.php');

// Verifica se veio algo do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Prepara e executa a busca no banco
    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $usuario = $result->fetch_assoc();

        // Comparar senha (caso esteja em texto puro)
        if ($usuario['senha'] == $senha) {
            $_SESSION['usuario'] = $usuario['nome']; // ou qualquer outro dado

            echo "Login feito com sucesso! Bem-vindo, " . $usuario['nome'];
            // Aqui você pode redirecionar:
            // header("Location: painel.php");
            // exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
} else {
    echo "Requisição inválida.";
}
?>
