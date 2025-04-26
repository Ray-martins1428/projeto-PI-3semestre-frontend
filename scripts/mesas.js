document.addEventListener("DOMContentLoaded", function () {
  const mesasContainer = document.getElementById("mesas-container");
  const pesquisaInput = document.getElementById("pesquisa-mesa");

  // Lista de mesas com nome e status (em breve será substituída por dados do banco)
  const mesas = [
    { nome: "Mesa 1", status: "livre" },
    { nome: "Mesa 2", status: "ocupada" },
    { nome: "Mesa 3", status: "fechada" },
    { nome: "Mesa 4", status: "livre" },
    { nome: "Mesa 5", status: "ocupada" },
    { nome: "Mesa 6", status: "livre" },
    { nome: "Mesa 7", status: "fechada" },
    { nome: "Mesa 8", status: "livre" },
    { nome: "Mesa 9", status: "ocupada" },
    { nome: "Mesa 10", status: "livre" },
    { nome: "Mesa 11", status: "fechada" },
    { nome: "Mesa 12", status: "ocupada" },
  ];

  // Função que renderiza as mesas na tela
  function renderizarMesas(filtro = "") {
    mesasContainer.innerHTML = "";

    // Filtra mesas conforme texto digitado na barra de pesquisa
    const mesasFiltradas = mesas.filter(mesa =>
      mesa.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    // Se não encontrar mesas, exibe mensagem
    if (mesasFiltradas.length === 0) {
      mesasContainer.innerHTML = "<p>Nenhuma mesa encontrada.</p>";
      return;
    }

    // Cria dinamicamente os elementos HTML para cada mesa
    mesasFiltradas.forEach(mesa => {
      const div = document.createElement("div");
      div.classList.add("mesa");

      // Cria e estiliza a tag de status (livre, ocupada, fechada)
      const span = document.createElement("span");
      span.classList.add("tag-status", mesa.status);
      span.textContent = mesa.status.charAt(0).toUpperCase() + mesa.status.slice(1);

      // Exibe o nome da mesa
      const nomeMesa = document.createElement("div");
      nomeMesa.classList.add("mesa-nome");
      nomeMesa.textContent = mesa.nome;

      // Adiciona tudo ao container principal da mesa
      div.appendChild(span);
      div.appendChild(nomeMesa);
      mesasContainer.appendChild(div);
    });
  }

  // Evento ao digitar na pesquisa
  pesquisaInput.addEventListener("input", () => {
    renderizarMesas(pesquisaInput.value);
  });

  // Renderiza as mesas assim que a página carrega
  renderizarMesas();
});
