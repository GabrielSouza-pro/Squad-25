// content.js
console.log("JavaScript injetado em uma página!");

// Função para criar contêineres expansíveis (não utilizada na versão final)
function createExpandableSection(buttonText, contentText, sectionId) {
  // ... código omitido para brevidade ...
}

// Cria a nova aba lateral
const newElement = document.createElement('div');
newElement.id = 'custom-container';  

// Cria o contêiner para o nome do cliente
const clientNameContainer = document.createElement('div');
clientNameContainer.id = 'client-name-container';

const clientName = document.createElement('h2');
clientName.innerText = 'Cliente:';
clientName.style.color = 'white';
clientName.style.textAlign = 'center';
clientName.id = 'clientName';

clientNameContainer.appendChild(clientName);
newElement.appendChild(clientNameContainer);

// Cria e adiciona o título CRM
const titulocrm = document.createElement('h1');
titulocrm.innerText = 'CRM';
titulocrm.id = 'titulo-crm';

newElement.appendChild(titulocrm);

// Linha horizontal
const hr = document.createElement('hr');
newElement.appendChild(hr);

// Lista de seções com conteúdo personalizado
const sectionsList = [
  { 
    id: 'empresas', 
    label: 'Empresas',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Empresas.';
      return p;
    }
  },
  { 
    id: 'negociacoes', 
    label: 'Negociações',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Negociações.';
      return p;
    }
  },
  { 
    id: 'produto_negociacoes', 
    label: 'Produto das negociações',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Produto das Negociações.';
      return p;
    }
  },
  { 
    id: 'produtos', 
    label: 'Produtos',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Produtos.';
      return p;
    }
  },
  { 
    id: 'campos_personalizados', 
    label: 'Campos personalizados',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Campos Personalizados.';
      return p;
    }
  },
  { 
    id: 'funil_vendas', 
    label: 'Funil de vendas',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Funil de Vendas.';
      return p;
    }
  },
  { 
    id: 'etapas_funil_vendas', 
    label: 'Etapas do funil de vendas',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Etapas do Funil de Vendas.';
      return p;
    }
  },
  { 
    id: 'tarefas', 
    label: 'Tarefas',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Tarefas.';
      return p;
    }
  },
  { 
    id: 'anotacoes', 
    label: 'Anotações',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Anotações.';
      return p;
    }
  },
  { 
    id: 'fontes', 
    label: 'Fontes',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Fontes.';
      return p;
    }
  },
  { 
    id: 'campanhas', 
    label: 'Campanhas',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Campanhas.';
      return p;
    }
  },
  { 
    id: 'motivo_perda', 
    label: 'Motivo da perda',
    content: () => {
      const p = document.createElement('p');
      p.innerText = 'Conteúdo exclusivo para Motivo da Perda.';
      return p;
    }
  }
];


// Função para injetar uma seção com conteúdo personalizado
function injectSection(section, contentGenerator) {
  const expandableContainer = document.createElement('div');
  expandableContainer.className = 'expandable-container';
  expandableContainer.id = `${section.id}-container`;

  const toggleButton = document.createElement('button');
  toggleButton.innerText = section.label;
  toggleButton.className = 'toggle-buttonn'; 
  toggleButton.id = `${section.id}-button`;

  // Gera o conteúdo usando a função fornecida
  const content = contentGenerator();
  content.style.margin = '0';
  content.id = `${section.id}-content`;

  // Adicione o conteúdo ao contêiner expansível
  expandableContainer.appendChild(content);

  // Adicione o listener para alternar a classe 'expanded'
  toggleButton.addEventListener('click', () => {
    expandableContainer.classList.toggle('expanded');
  });

  // Adicione os elementos ao novo elemento principal
  newElement.appendChild(toggleButton);
  newElement.appendChild(expandableContainer);
}

// Função para injetar todas as seções habilitadas com conteúdo personalizado
function injectSections(settings) {
  sectionsList.forEach(section => {
    if (settings[section.id]) { // Verifica se a seção está habilitada
      injectSection(section, section.content);
    }
  });
}

// Funções auxiliares para adicionar elementos dinamicamente
/**
 * Adiciona um parágrafo a uma seção específica.
 * @param {string} sectionId - ID da seção onde o parágrafo será adicionado.
 * @param {string} text - Texto do parágrafo.
 */
function addParagraphToSection(sectionId, text) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    const p = document.createElement('p');
    p.innerText = text;
    contentContainer.appendChild(p);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

/**
 * Adiciona um elemento personalizado a uma seção específica.
 * @param {string} sectionId - ID da seção onde o elemento será adicionado.
 * @param {HTMLElement} element - Elemento DOM a ser adicionado.
 */
function addElementToSection(sectionId, element) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    contentContainer.appendChild(element);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

// Função para verificar o ID na URL e fazer a requisição para a API
function minhaFuncao() {
  // Obter o token do localStorage da página
  let token = window.localStorage.getItem('token');
  console.log("Token original:", token);

  if (!token) {
    console.error("Token não encontrado no localStorage da página.");
    return;
  }

  // Remove aspas simples e duplas do token, se houver
  token = token.replace(/["']/g, '');
  console.log("Token sem aspas:", token);

  const urlAtual = window.location.href;
  console.log("URL atual:", urlAtual);

  const regex = /\/atendimento\/(\d+)/;
  const match = urlAtual.match(regex);

  if (match && match[1]) {
    let id = match[1].replace(/\s+/g, ''); // Remove espaços do ID
    console.log("ID capturado e filtrado da URL:", id);

    const apiUrl = `https://chatapi.jetsalesbrasil.com/tickets/${id}?id=${id}`;
    console.log("URL da API que será chamada:", apiUrl);

    fetch(apiUrl, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${token}`
      },
      method: "GET"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Resposta completa da API:", data);

      if (data.contact && data.contact.pushname) {
        const content = data.contact.pushname;

        console.log("Nome do cliente: " + content);

        const clientNameElement = document.getElementById('clientName');
        if (clientNameElement) {
          clientNameElement.innerText = `Cliente: ${content}`;
          console.log("Texto atualizado para: " + content);
        } else {
          console.log('Elemento clientName não encontrado');
        }
      } else {
        console.error("A chave 'contact.pushname' não foi encontrada na resposta.");
      }
    })
    .catch(error => {
      console.error('Houve um problema com a operação fetch:', error);
    });
  } else {
    console.error('ID não encontrado na URL.');
  }
}

// Função para observar mudanças na URL usando MutationObserver
function observarMudancaDeURL() {
  let urlAnterior = window.location.href;

  const observer = new MutationObserver(() => {
    const urlAtual = window.location.href;
    if (urlAnterior !== urlAtual) {
      console.log("A URL mudou. Nova URL:", urlAtual);
      minhaFuncao();
      initializeContent(); // Re-injetar seções com base nas novas configurações
      urlAnterior = urlAtual;
    }
  });

  // Observa mudanças no elemento `<title>` que geralmente muda com a navegação SPA
  const titleElement = document.querySelector('title');
  if (titleElement) {
    observer.observe(titleElement, { childList: true });
  }

  // Adiciona um listener para o evento 'popstate' caso a SPA use history API
  window.addEventListener('popstate', () => {
    const urlAtual = window.location.href;
    if (urlAnterior !== urlAtual) {
      console.log("A URL mudou via popstate. Nova URL:", urlAtual);
      minhaFuncao();
      initializeContent(); // Re-injetar seções com base nas novas configurações
      urlAnterior = urlAtual;
    }
  });
}

// Função para inicializar o conteúdo com base nas configurações
function initializeContent() {
  chrome.storage.local.get(['sectionSettings'], (result) => {
    let settings = result.sectionSettings;
    if (!settings) {
      // Se nenhuma configuração encontrada, habilitar todas as seções por padrão
      settings = {};
      sectionsList.forEach(section => {
        settings[section.id] = true;
      });
      chrome.storage.local.set({ sectionSettings: settings });
    }
    injectSections(settings);
  });
}

// Inicialização
newElement.appendChild(document.createElement('div')); // Assegura que newElement tenha algum filho inicial
document.body.appendChild(newElement);

initializeContent();

// Inicia o observador de mudanças na URL
observarMudancaDeURL();

// Chama a função inicialmente caso já esteja na URL desejada
minhaFuncao();

// Listener para mudanças nas configurações armazenadas
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.sectionSettings) {
    const newSettings = changes.sectionSettings.newValue;
    // Remove todas as seções atuais
    sectionsList.forEach(section => {
      const container = document.getElementById(`${section.id}-container`);
      if (container) {
        container.remove();
      }
      const button = document.getElementById(`${section.id}-button`);
      if (button) {
        button.remove();
      }
    });
    // Injeta as seções com base nas novas configurações
    injectSections(newSettings);
  }

  // Atualiza o token se ele mudar
  if (namespace === 'local' && changes.token) {
    minhaFuncao();
  }
});

// Exemplo de utilização das funções auxiliares (pode ser removido depois)
/*
 // Adiciona um parágrafo à seção 'empresas'
 addParagraphToSection('empresas', 'Este é um parágrafo adicional para Empresas.');
 
 // Adiciona um botão à seção 'negociacoes'
 const novoBotao = document.createElement('button');
 novoBotao.innerText = 'Novo Botão';
 novoBotao.addEventListener('click', () => alert('Novo botão clicado!'));
 addElementToSection('negociacoes', novoBotao);
 */