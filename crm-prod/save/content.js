// ===== SEÇÃO 1: Inicialização e Definição de Propriedades =====

// Log para confirmar a injeção do script
console.log("JavaScript injetado em uma página!");

// Definindo propriedades globais
window.user_idre = null;
let numerodetellValue = null;

// Definindo getter e setter para a propriedade 'numerodetell'
Object.defineProperty(window, 'numerodetell', {
  get: function () {
    return numerodetellValue;
  },
  set: function (value) {
    if (numerodetellValue !== value) {
      console.log(`numerodetell mudou de ${numerodetellValue} para ${value}`);
      numerodetellValue = value;
      handleNumerodetellChange(value); // Chama função para lidar com a mudança
    }
  },
  configurable: true,
  enumerable: true
});

// ===== SEÇÃO 2: Manipulação de Mudanças em 'numerodetell' =====

/**
 * Função para lidar com mudanças na propriedade 'numerodetell'
 * @param {string} newNumber - Novo número atribuído a 'numerodetell'
 */
function handleNumerodetellChange(newNumber) {
  // Obtém o token do Chrome Storage
  chrome.storage.local.get(['tokenrdsarion'], (result) => {
    let tokenrdsarion = result.tokenrdsarion;
    console.log("Token rdsarion:", tokenrdsarion);

    if (!tokenrdsarion) {
      console.error("tokenrdsarion não encontrado no chrome.storage.local.");
      return;
    }

    const phone = newNumber;
    const apiUrl = `https://crm.rdstation.com/api/v1/contacts?token=${tokenrdsarion}&phone=${phone}`;

    const headers = {
      "accept": "application/json"
    };

    // Envia mensagem para o background script para fazer a requisição fetch
    chrome.runtime.sendMessage(
      {
        action: 'fetchData',
        url: apiUrl,
        headers: headers
      },
      (response) => {
        if (response.success) {
          const data = response.data;
          console.log("Resposta da API:", data);
          if (data.total > 0 && data.contacts && data.contacts.length > 0) {
            const contact = data.contacts[0];
            const contactId = contact._id;
            if (contactId) {
              window.user_idre = contactId;
              console.log("user_idre atualizado para:", window.user_idre);
            } else {
              console.error("A chave '_id' não foi encontrada no contato.");
            }
          } else {
            console.log("Nenhum contato encontrado.");
          }
        } else {
          console.error('Houve um problema com a operação fetch:', response.error);
        }
      }
    );
  });
}

// ===== SEÇÃO 3: Criação de Seções Expansíveis =====

/**
 * Função para criar uma seção expansível na interface
 * @param {string} buttonText - Texto do botão que expansão/contração
 * @param {Function} contentGenerator - Função que gera o conteúdo da seção
 * @param {string} sectionId - ID único para a seção
 */
function createExpandableSection(buttonText, contentGenerator, sectionId) {
  const expandableContainer = document.createElement('div');
  expandableContainer.className = 'expandable-container';
  expandableContainer.id = `${sectionId}-container`;

  const toggleButton = document.createElement('button');
  toggleButton.innerText = buttonText;
  toggleButton.className = 'toggle-buttonn';
  toggleButton.id = `${sectionId}-button`;

  const content = contentGenerator();
  content.style.margin = '0';
  content.id = `${sectionId}-content`;

  expandableContainer.appendChild(content);

  // Evento para alternar a classe 'expanded' ao clicar no botão
  toggleButton.addEventListener('click', () => {
    expandableContainer.classList.toggle('expanded');
  });

  newElement.appendChild(toggleButton);
  newElement.appendChild(expandableContainer);
}

// ===== SEÇÃO 4: Adicionando o Botão de Toggle do CRM =====

/**
 * Função para adicionar o botão de toggle do CRM na interface
 */
function adicionarBotaoToggle() { 
  const divAlvo = document.querySelector('div.q-gutter-sm.row.items-center.no-wrap'); 
  if (!divAlvo) { 
    console.error('Div alvo não encontrada.'); 
    return; 
  }
  // Evita adicionar múltiplos botões 
  if (document.getElementById('botao-toggle-crm')) { 
    return; 
  }
  
  const botaoToggle = document.createElement('button'); 
  botaoToggle.id = 'botao-toggle-crm'; 
  botaoToggle.className = 'q-btn q-btn-item non-selectable no-outline btn-rounded toggle-crm-btn q-btn--flat q-btn--round text-white q-btn--actionable q-focusable q-hoverable q-btn--wrap'; 
  botaoToggle.innerHTML = `
    <span class="q-focus-helper"></span> 
    <span class="q-btn__wrapper col row q-anchor--skip"> 
      <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"> 
        <i aria-hidden="true" role="img" class="q-icon mdi mdi-eye"></i> 
      </span> 
    </span>`; 
  botaoToggle.title = 'Mostrar/Ocultar CRM';
  
  // Utiliza prepend para inserir no início da div
  divAlvo.prepend(botaoToggle);
  
  // Evento de clique para mostrar ou ocultar o contêiner personalizado 
  botaoToggle.addEventListener('click', () => { 
    const customContainer = document.getElementById('custom-container'); 
    if (!customContainer) { 
      console.error('#custom-container não encontrado.'); 
      return; 
    }
    
    customContainer.classList.toggle('visible'); // Alterna a classe 'visible'
  }); 
}

// Adiciona o botão de toggle ao carregar o DOM
document.addEventListener('DOMContentLoaded', adicionarBotaoToggle);

// ===== SEÇÃO 5: Observador de Mutação no DOM =====

// Observador para detectar mudanças no DOM e adicionar o botão de toggle se necessário
const observer = new MutationObserver((mutations, obs) => {
  const divAlvo = document.querySelector('div.q-gutter-sm.row.items-center.no-wrap');
  if (divAlvo && !document.getElementById('botao-toggle-crm')) {
    adicionarBotaoToggle();
  }
});
observer.observe(document, { childList: true, subtree: true });

// ===== SEÇÃO 6: Monitoramento do Modo Escuro =====

/**
 * Função para monitorar mudanças no modo escuro/claro da interface
 */
function monitorarModoEscuro() {
  const divAlvo = document.querySelector('div.q-scrollarea');

  if (!divAlvo) {
    console.error('Div alvo para monitoramento não encontrada.');
    return;
  }

  // Função para verificar e ativar o modo correspondente
  const verificarModo = () => {
    const isDark = divAlvo.classList.contains('q-scrollarea--dark');
    if (isDark) {
      ativarModoEscuro();
    } else {
      ativarModoClaro();
    }
  };

  verificarModo();

  // Observador para detectar mudanças nas classes da div alvo
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        verificarModo();
      }
    });
  });

  observer.observe(divAlvo, { attributes: true, attributeFilter: ['class'] });
}

/**
 * Função para ativar o modo escuro na extensão
 */
function ativarModoEscuro() {
  const customContainer = document.getElementById('custom-container');
  if (customContainer && !customContainer.classList.contains('modo-escuro')) {
    customContainer.classList.add('modo-escuro');
    console.log('Modo Escuro ativado na extensão.');
  }

  // Atualiza a cor do botão de toggle para o modo escuro
  const botaoToggle = document.getElementById('botao-toggle-crm');
  if (botaoToggle) {
    // Mantém a cor atual ou define uma cor específica para o modo escuro
    botaoToggle.style.backgroundColor = '#444444'; // Cor padrão no modo escuro
    // Opcional: Atualiza a cor do ícone se necessário
    botaoToggle.querySelector('.q-icon').style.color = '#ffffff';
  }
}

/**
 * Função para ativar o modo claro na extensão
 */
function ativarModoClaro() {
  const customContainer = document.getElementById('custom-container');
  if (customContainer && customContainer.classList.contains('modo-escuro')) {
    customContainer.classList.remove('modo-escuro');
    console.log('Modo Claro ativado na extensão.');
  }

  // Atualiza a cor do botão de toggle para o modo claro
  const botaoToggle = document.getElementById('botao-toggle-crm');
  if (botaoToggle) {
    botaoToggle.style.backgroundColor = 'rgb(5,78,142)'; // Cor especificada para o modo claro
    // Opcional: Atualiza a cor do ícone se necessário
    botaoToggle.querySelector('.q-icon').style.color = '#ffffff';
  }
}
// Inicia o monitoramento do modo escuro ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  monitorarModoEscuro();
});

// ===== SEÇÃO 7: Definição das Seções Personalizadas =====

// Lista de seções com seus respectivos IDs, labels e geradores de conteúdo
const sectionsList = [
  { id: 'empresas', label: 'Empresas', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Empresas.'; return p; } },
  { id: 'negociacoes', label: 'Negociações', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Negociações.'; return p; } },
  { id: 'produto_negociacoes', label: 'Produto das negociações', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Produto das Negociações.'; return p; } },
  { id: 'produtos', label: 'Produtos', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Produtos.'; return p; } },
  { id: 'campos_personalizados', label: 'Campos personalizados', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Campos Personalizados.'; return p; } },
  { id: 'funil_vendas', label: 'Funil de vendas', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Funil de Vendas.'; return p; } },
  { id: 'etapas_funil_vendas', label: 'Etapas do funil de vendas', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Etapas do Funil de Vendas.'; return p; } },
  { id: 'tarefas', label: 'Tarefas', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Tarefas.'; return p; } },
  { id: 'anotacoes', label: 'Anotações', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Anotações.'; return p; } },
  { id: 'fontes', label: 'Fontes', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Fontes.'; return p; } },
  { id: 'campanhas', label: 'Campanhas', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Campanhas.'; return p; } },
  { id: 'motivo_perda', label: 'Motivo da perda', content: () => { const p = document.createElement('p'); p.innerText = 'Conteúdo exclusivo para Motivo da Perda.'; return p; } }
];

/**
 * Função para injetar uma seção personalizada na interface
 * @param {Object} section - Objeto representando a seção
 * @param {Function} contentGenerator - Função que gera o conteúdo da seção
 */
function injectSection(section, contentGenerator) {
  createExpandableSection(section.label, contentGenerator, section.id);
}

/**
 * Função para injetar múltiplas seções com base nas configurações
 * @param {Object} settings - Configurações de ativação das seções
 */
function injectSections(settings) {
  sectionsList.forEach(section => {
    if (settings[section.id]) {
      injectSection(section, section.content);
    }
  });
}

/**
 * Função para adicionar um parágrafo a uma seção específica
 * @param {string} sectionId - ID da seção
 * @param {string} text - Texto do parágrafo
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
 * Função para adicionar um elemento HTML a uma seção específica
 * @param {string} sectionId - ID da seção
 * @param {HTMLElement} element - Elemento a ser adicionado
 */
function addElementToSection(sectionId, element) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    contentContainer.appendChild(element);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

// ===== SEÇÃO 8: Função Principal para Operações de API =====

/**
 * Função principal que realiza operações de API e atualiza a interface
 */
function minhaFuncao() {
  let token = window.localStorage.getItem('token');
  console.log("Token original:", token);

  if (!token) {
    console.error("Token não encontrado no localStorage da página.");
    return;
  }

  // Remove aspas do token
  token = token.replace(/["']/g, '');
  console.log("Token sem aspas:", token);

  const urlAtual = window.location.href;
  console.log("URL atual:", urlAtual);

  // Expressão regular para capturar o ID da URL
  const regex = /\/atendimento\/(\d+)/;
  const match = urlAtual.match(regex);

  if (match && match[1]) {
    let id = match[1].replace(/\s+/g, '');
    console.log("ID capturado e filtrado da URL:", id);

    const apiUrl = `https://chatapi.jetsalesbrasil.com/tickets/${id}?id=${id}`;
    console.log("URL da API que será chamada:", apiUrl);

    // Realiza a requisição fetch para a API
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

      // Atualiza o nome do cliente na interface
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

      // Atualiza o número do cliente na propriedade 'numerodetell'
      if (data.contact && data.contact.number) {
        window.numerodetell = data.contact.number;
        console.log("Número do cliente armazenado em numerodetell:", window.numerodetell);
      } else {
        console.error("A chave 'contact.number' não foi encontrada na resposta.");
      }
    })
    .catch(error => {
      console.error('Houve um problema com a operação fetch:', error);
    });
  } else {
    console.error('ID não encontrado na URL.');
  }
}

// ===== SEÇÃO 9: Observador de Mudança de URL =====

/**
 * Função para observar mudanças na URL e executar ações quando a URL muda
 */
function observarMudancaDeURL() {
  let urlAnterior = window.location.href;

  setInterval(() => {
    const urlAtual = window.location.href;
    if (urlAnterior !== urlAtual) {
      console.log("A URL mudou. Nova URL:", urlAtual);
      minhaFuncao(); // Executa a função principal novamente
      urlAnterior = urlAtual;
    }
  }, 1000); // Verifica a cada segundo
}

// ===== SEÇÃO 10: Inicialização do Conteúdo Personalizado =====

/**
 * Função para inicializar o conteúdo personalizado com base nas configurações
 */
function initializeContent() {
  chrome.storage.local.get(['sectionSettings'], (result) => {
    let settings = result.sectionSettings;
    if (!settings) {
      // Define todas as seções como ativas por padrão
      settings = {};
      sectionsList.forEach(section => {
        settings[section.id] = true;
      });
      chrome.storage.local.set({ sectionSettings: settings });
    }
    injectSections(settings); // Injeta as seções conforme as configurações
  });
}

// ===== SEÇÃO 11: Criação do Contêiner Personalizado =====

// Cria o contêiner principal personalizado
const newElement = document.createElement('div');
newElement.id = 'custom-container';

// Cria o contêiner para o nome do cliente
const clientNameContainer = document.createElement('div');
clientNameContainer.id = 'client-name-container';

// Cria o elemento para exibir o nome do cliente
const clientName = document.createElement('h2');
clientName.innerText = 'Cliente:';
clientName.style.color = 'white';
clientName.style.textAlign = 'center';
clientName.id = 'clientName';

clientNameContainer.appendChild(clientName);
newElement.appendChild(clientNameContainer);

// Cria o título do CRM
const titulocrm = document.createElement('h1');
titulocrm.innerText = 'CRM';
titulocrm.id = 'titulo-crm';

newElement.appendChild(titulocrm);

// Adiciona uma linha horizontal
const hr = document.createElement('hr');
newElement.appendChild(hr);

// Adiciona um contêiner vazio para futuras seções
newElement.appendChild(document.createElement('div'));

// Adiciona o contêiner personalizado ao corpo do documento
document.body.appendChild(newElement);

// ===== SEÇÃO 12: Inicialização e Execução das Funções Principais =====

// Observa mudanças na URL
observarMudancaDeURL();

// Inicializa o conteúdo personalizado
initializeContent();

// Executa a função principal imediatamente
minhaFuncao();

// Verifica novamente o modo escuro/claro
monitorarModoEscuro();

// ===== SEÇÃO 13: Listener para Mudanças no Chrome Storage =====

// Listener para detectar mudanças no armazenamento local do Chrome
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    // Verifica se houve mudanças nas configurações das seções
    if (changes.sectionSettings) {
      const newSettings = changes.sectionSettings.newValue;
      sectionsList.forEach(section => {
        // Remove a seção existente
        const container = document.getElementById(`${section.id}-container`);
        if (container) {
          container.remove();
        }
        const button = document.getElementById(`${section.id}-button`);
        if (button) { 
          button.remove();
        }
      });
      // Injeta as seções novamente conforme as novas configurações
      injectSections(newSettings);
    }

    // Verifica se houve mudanças no 'tokenrdsarion'
    if (changes.tokenrdsarion) {
      console.log("Tokenrdsarion foi atualizado.");
      minhaFuncao(); // Re-executa a função principal para atualizar dados
    }
  }
});
