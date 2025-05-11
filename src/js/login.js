document.addEventListener("DOMContentLoaded", function () { //necessario para garantir que o DOM esteja completamente carregado antes de executar o código
    const form = document.getElementById("login-form");//elementos do HTML
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const rememberCheckbox = document.getElementById("remember-checkbox");

    // Função para exibir mensagens visuais na tela
    function mostrarMensagem(texto, tipo) {
        const box = document.getElementById("message-box");
        box.textContent = texto;
        box.className = tipo; // 'success' ou 'error'
        box.style.display = "block";

        // Esconde depois de 3 segundos
        setTimeout(() => {
            box.style.display = "none";
        }, 3000);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const usuarioCorreto = "admin@restaurante.com";
        const senhaCorreta = "123456";
        console.log(username, password); // Para depuração
        console.log(usuarioCorreto, senhaCorreta); // Para depuração

        if (username === usuarioCorreto && password === senhaCorreta) {
            mostrarMensagem("✅ Login realizado com sucesso!", "success");

            if (rememberCheckbox.checked) {
                localStorage.setItem("usuarioLembrado", username);
            } else {
                localStorage.removeItem("usuarioLembrado");
            }

            // Redirecionar se quiser:
            // window.location.href = "home.html";
        } else {
            mostrarMensagem("❌ Usuário ou senha incorretos.", "error");
        }
    });

    const usuarioSalvo = localStorage.getItem("usuarioLembrado");
    if (usuarioSalvo) {
        usernameInput.value = usuarioSalvo;
        rememberCheckbox.checked = true;
    }
});