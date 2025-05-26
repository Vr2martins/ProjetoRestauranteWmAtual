    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("form");
    
        // Função para mostrar mensagem visual
        function mostrarMensagem(texto, tipo) {
            const box = document.getElementById("message-box");
            box.textContent = texto;
            box.className = tipo; // "success" ou "error"
            box.style.display = "block";
    
            setTimeout(() => {
                box.style.display = "none";
            }, 3000);
        }
    
        form.addEventListener("submit", function (event) {
            event.preventDefault();
    
            // Pegando os valores dos inputs
            const nome = form.querySelector("input[placeholder='Nome completo']").value.trim();
            const contato = form.querySelector("input[placeholder='Telefone']").value.trim();
            const email = form.querySelector("input[placeholder='E-mail']").value.trim();
            const senha = form.querySelector("input[placeholder='Senha']").value.trim();
            const endereco = form.querySelector("input[name='endereco']").value.trim();
            const cidade = form.querySelector("input[name='cidade']").value.trim();
            const cep = form.querySelector("input[name='cep']").value.trim();
    
            // Verificação de preenchimento
            if (!nome || !contato || !email || !senha || !endereco || !cidade || !cep) {
                mostrarMensagem("❌ Por favor, preencha todos os campos.", "error");
                return;
            }
    
            // Verificando se o e-mail já foi cadastrado
            const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioExistente = usuariosSalvos.find(u => u.email === email);
    
            if (usuarioExistente) {
                mostrarMensagem("❌ Este e-mail já está cadastrado.", "error");
                return;
            }
    
            // Criar novo usuário
            const novoUsuario = {
                nome,
                contato,
                email,
                senha,
                endereco,
                cidade,
                cep
            };
    
            // Salvar no localStorage
            usuariosSalvos.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));
    
            mostrarMensagem("✅ Cadastro realizado com sucesso!", "success");
    
            // Limpar formulário
            form.reset();
    
            // Redirecionar para login após alguns segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        });
    });