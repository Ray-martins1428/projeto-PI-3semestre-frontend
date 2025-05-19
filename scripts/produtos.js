// === CONFIGURAÇÃO GERAL =========================================
const BASE_URL = 'http://localhost:4040/produtos';  // URL base da API de produtos

// === ELEMENTOS DO DOM ===========================================
// Tabela onde os produtos serão listados
const tabelaBody = document.querySelector('#produtos-tabela tbody');

// Modais de edição
const modalEditar = document.getElementById('modal-editar');
const formEditar  = document.getElementById('form-editar');

// Modais de novo produto
const modalNovo = document.getElementById('modal-novo-produto');
const formNovo  = document.getElementById('form-novo-produto');

// Cabeçalhos padrão para requisições JSON
const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// === LISTAR PRODUTOS ============================================
async function carregarProdutos() {
  // Mostra mensagem de carregamento
  tabelaBody.innerHTML = '<tr><td colspan="5">Carregando…</td></tr>';

  try {
    // Requisição GET para buscar todos os produtos
    const res   = await fetch(BASE_URL, { headers: { Accept: 'application/json' } });
    const dados = await res.json();

    // Limpa tabela antes de exibir os dados
    tabelaBody.innerHTML = '';

    // Se não houver produtos ou houver erro na resposta
    if (!dados.success || !dados.values?.length) {
      tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum produto encontrado.</td></tr>';
      return;
    }

    // Para cada produto retornado, adiciona uma linha na tabela
    dados.values.forEach(prod => adicionarLinha(prod));

  } catch (err) {
    // Em caso de erro na requisição
    tabelaBody.innerHTML = '<tr><td colspan="5">Erro ao carregar produtos.</td></tr>';
    console.error(err);
  }
}

// Função auxiliar para adicionar produto à tabela
function adicionarLinha({ id_produtos, nome, descricao, volume, valor }) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${nome}</td>
    <td>${descricao}</td>
    <td>${volume}</td>
    <td>${Number(valor).toFixed(2)}</td>
    <td>
      <button class="btn-editar">Editar</button>
      <button class="btn-excluir">Excluir</button>
    </td>
  `;

  // Botão editar: abre modal com dados do produto
  tr.querySelector('.btn-editar')
    .addEventListener('click', () =>
      abrirModalEdicao({ id_produtos, nome, descricao, volume, valor })
    );

  // Botão excluir: chama função de exclusão
  tr.querySelector('.btn-excluir')
    .addEventListener('click', () =>
      excluirProduto(id_produtos)
    );

  // Adiciona a linha na tabela
  tabelaBody.appendChild(tr);
}

// === EXCLUIR PRODUTO ============================================
async function excluirProduto(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });

    const dados = await res.json();

    if (res.ok && dados.success) {
      alert('Produto excluído com sucesso!');
      carregarProdutos();  // Recarrega a lista
    } else {
      throw new Error(dados.message || `Erro HTTP ${res.status}`);
    }
  } catch (err) {
    alert(`Erro ao excluir: ${err.message}`);
    console.error(err);
  }
}

// === EDITAR PRODUTO =============================================
function abrirModalEdicao(prod) {
  // Preenche os campos do formulário com os dados do produto
  document.getElementById('edit-id').value         = prod.id_produtos;
  document.getElementById('edit-nome').value       = prod.nome;
  document.getElementById('edit-descricao').value  = prod.descricao;
  document.getElementById('edit-volume').value     = prod.volume;
  document.getElementById('edit-valor').value      = prod.valor;

  // Exibe o modal de edição
  modalEditar.showModal();
}

// Ao enviar o formulário de edição
formEditar.addEventListener('submit', async e => {
  e.preventDefault();  // Impede recarregamento da página

  const id = document.getElementById('edit-id').value;

  // Monta o payload com os dados atualizados
  const payload = {
    nome:       document.getElementById('edit-nome').value.trim(),
    descricao:  document.getElementById('edit-descricao').value.trim(),
    volume:     document.getElementById('edit-volume').value.trim(),
    valor:      parseFloat(document.getElementById('edit-valor').value)
  };

  try {
    const res   = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: jsonHeaders,
      body: JSON.stringify(payload)
    });

    const dados = await res.json();

    if (res.ok && dados.success) {
      modalEditar.close();     // Fecha o modal
      carregarProdutos();      // Atualiza a lista
      alert('Produto atualizado!');
    } else {
      throw new Error(dados.message || `Erro HTTP ${res.status}`);
    }
  } catch (err) {
    alert(`Erro ao atualizar: ${err.message}`);
    console.error(err);
  }
});

// Botão "Cancelar" do modal de edição
document.getElementById('btn-cancelar')
  .addEventListener('click', () => modalEditar.close());

// === ADICIONAR NOVO PRODUTO =====================================
document.getElementById('btn-novo-produto')
  .addEventListener('click', () => {
    formNovo.reset();          // Limpa os campos
    modalNovo.showModal();     // Abre o modal
  });

// Ao enviar o formulário de novo produto
formNovo.addEventListener('submit', async e => {
  e.preventDefault();

  // Monta o payload com os dados do formulário
  const payload = {
    nome:       document.getElementById('novo-nome').value.trim(),
    descricao:  document.getElementById('novo-descricao').value.trim(),
    volume:     document.getElementById('novo-volume').value.trim(),
    valor:      parseFloat(document.getElementById('novo-valor').value)
  };

  try {
    const res   = await fetch(BASE_URL, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(payload)
    });

    const dados = await res.json();

    // Trata possíveis variações de 'success' vindas do backend
    const ok = dados.success ?? dados.sucess;

    if (res.ok && ok) {
      modalNovo.close();       // Fecha o modal
      carregarProdutos();      // Atualiza a lista
      alert('Produto adicionado!');
    } else {
      throw new Error(dados.message || `Erro HTTP ${res.status}`);
    }
  } catch (err) {
    alert(`Erro ao adicionar: ${err.message}`);
    console.error(err);
  }
});

// Botão "Cancelar" do modal de novo produto
document.getElementById('btn-cancelar-novo')
  .addEventListener('click', () => modalNovo.close());

// === INICIALIZAÇÃO ==============================================
carregarProdutos();  // Carrega a lista ao abrir a página
