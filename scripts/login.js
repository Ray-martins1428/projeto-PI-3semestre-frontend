// Espera a página carregar totalmente antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("login-form"); // Seleciona o formulário de login pelo ID

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o formulário de enviar da forma tradicional (recarregando a página)

        const usuario = document.getElementById("usuario").value; // Pega o valor digitado no campo de usuário
        const senha = document.getElementById("senha").value;     // Pega o valor digitado no campo de senha

        try {   // Tenta fazer a requisição para a API de login
            const response = await fetch('URL_DA_API_AQUI', { // { <-- Abertura do objeto de configuração do fetch
                method: 'POST', // Método de envio: POST = estamos enviando dados
                headers: {      // { <-- Abertura do cabeçalho da requisição
                    'Content-Type': 'application/json' // Dizemos que estamos enviando um JSON
                },              // } <-- Fechamento do cabeçalho
                
                body: JSON.stringify({ // { <-- Abertura do corpo da requisição
                    usuario: usuario, // Nome do campo enviado para a API
                    senha: senha      // Senha enviada para a API
                }) // } <-- Fechamento do corpo
            }); // } <-- Fechamento do fetch

            if (response.ok) { // Se a resposta da API for positiva (status HTTP 200)
                const data = await response.json(); // Converte a resposta para objeto JavaScript

                if (data.autenticado) { // Se a API responder que autenticou
                    window.location.href = "mesas.html"; // Redireciona o usuário para a página das mesas
                } else {
                    alert("Usuário ou senha inválidos!"); // Se a autenticação falhar, avisa o usuário
                }
            } else {
                alert("Erro na conexão com o servidor. Tente novamente."); // Erro de conexão, mas não crasha o site
            }
        } catch (error) {
            // Se der qualquer erro inesperado, como servidor off ou problemas na internet
            console.error("Erro ao fazer login:", error);
            alert("Erro inesperado. Verifique sua conexão e tente novamente.");
        }
    });
});
