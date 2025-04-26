document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("open_btn");
  const logoutBtn = document.getElementById("logout_btn");
  const menuLinks = document.querySelectorAll(".side-item a");

  // Restaura o estado do menu a partir do localStorage
  const estadoMenu = localStorage.getItem("menu_aberto");
  if (estadoMenu === "true") {
    sidebar.classList.add("open-sidebar");
  }

  // ANIMAÇÃO DE ABRIR E FECHAR O MENU
  if (openBtn && sidebar) {
    openBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open-sidebar");

      // Salva no localStorage o estado atual do menu
      const menuAberto = sidebar.classList.contains("open-sidebar");
      localStorage.setItem("menu_aberto", menuAberto);
    });
  }

  // FUNÇÃO DE LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.clear();
      localStorage.clear(); // limpa também o estado do menu
      window.location.href = "../pages/login.html";

      // Impede o usuário de voltar com o botão voltar
      history.pushState(null, null, "../pages/login.html");
      window.addEventListener("popstate", () => {
        history.pushState(null, null, "../pages/login.html");
      });
    });
  }

  // DESTACA O LINK ATIVO E DESATIVA O CLIQUE
  const currentPage = window.location.pathname.split("/").pop();
  menuLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.parentElement.classList.add("active");
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Impede recarregar a mesma página
      });
      link.style.cursor = "default"; // Cursor visual de "não clicável"
    }
  });
});
