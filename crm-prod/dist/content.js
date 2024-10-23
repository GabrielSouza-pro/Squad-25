console.log("JavaScript injetado em uma página!");

// 1. Criação da variável global 'user_idre'
window.user_idre = null;

// 2. Inicialização e monitoramento da variável 'numerodetell' com getter/setter
let numerodetellValue = null;

Object.defineProperty(window, 'numerodetell', {
  get: function () {
    return numerodetellValue;
  },
  set: function (value) {
    if (numerodetellValue !== value) {
      console.log(`numerodetell mudou de ${numerodetellValue} para ${value}`);
      numerodetellValue = value;
      handleNumerodetellChange(value); // Chama a função quando 'numerodetell' muda
    }
  },
  configurable: true,
  enumerable: true
});

// 3. Função para realizar a chamada à API quando 'numerodetell' muda
function handleNumerodetellChange(newNumber) {
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

// 4. Função para criar contêineres expansíveis
function createExpandableSection(buttonText, contentGenerator, sectionId) {
  const expandableContainer = document.createElement('div');
  expandableContainer.className = 'expandable-container';
  expandableContainer.id = `${sectionId}-container`;

  const toggleButton = document.createElement('button');
  toggleButton.innerText = buttonText;
  toggleButton.className = 'toggle-buttonn';
  toggleButton.id = `${sectionId}-button`;

  // Gera o conteúdo usando a função fornecida
  const content = contentGenerator();
  content.style.margin = '0';
  content.id = `${sectionId}-content`;

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

// 5. Lista de seções com conteúdo personalizado
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

// 6. Função para injetar uma seção com conteúdo personalizado
function injectSection(section, contentGenerator) {
  createExpandableSection(section.label, contentGenerator, section.id);
}

// 7. Função para injetar todas as seções habilitadas com conteúdo personalizado
function injectSections(settings) {
  sectionsList.forEach(section => {
    if (settings[section.id]) { // Verifica se a seção está habilitada
      injectSection(section, section.content);
    }
  });
}

// 8. Funções auxiliares para adicionar elementos dinamicamente
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

function addElementToSection(sectionId, element) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    contentContainer.appendChild(element);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

// 9. Função para verificar o ID na URL e fazer a requisição para a API
function minhaFuncao() {
  let token = window.localStorage.getItem('token');
  console.log("Token original:", token);

  if (!token) {
    console.error("Token não encontrado no localStorage da página.");
    return;
  }

  token = token.replace(/["']/g, '');
  console.log("Token sem aspas:", token);

  const urlAtual = window.location.href;
  console.log("URL atual:", urlAtual);

  const regex = /\/atendimento\/(\d+)/;
  const match = urlAtual.match(regex);

  if (match && match[1]) {
    let id = match[1].replace(/\s+/g, '');
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

// 10. Função para observar mudanças na URL usando setInterval
function observarMudancaDeURL() {
  let urlAnterior = window.location.href;

  setInterval(() => {
    const urlAtual = window.location.href;
    if (urlAnterior !== urlAtual) {
      console.log("A URL mudou. Nova URL:", urlAtual);
      minhaFuncao();
      urlAnterior = urlAtual;
    }
  }, 1000); // Verifica a cada 1000 milissegundos (1 segundo)
} 

// 11. Função para inicializar o conteúdo com base nas configurações
function initializeContent() {
  chrome.storage.local.get(['sectionSettings'], (result) => {
    let settings = result.sectionSettings;
    if (!settings) {
      settings = {};
      sectionsList.forEach(section => {
        settings[section.id] = true;
      });
      chrome.storage.local.set({ sectionSettings: settings });
    }
    injectSections(settings);
  });
}

// 12. Criação da nova aba lateral
const newElement = document.createElement('div');
newElement.id = 'custom-container';

const clientNameContainer = document.createElement('div');
clientNameContainer.id = 'client-name-container';

const clientName = document.createElement('h2');
clientName.innerText = 'Cliente:';
clientName.style.color = 'white';
clientName.style.textAlign = 'center';
clientName.id = 'clientName';

clientNameContainer.appendChild(clientName);
newElement.appendChild(clientNameContainer);

const titulocrm = document.createElement('h1');
titulocrm.innerText = 'CRM';
titulocrm.id = 'titulo-crm';

newElement.appendChild(titulocrm);

const hr = document.createElement('hr');
newElement.appendChild(hr);

newElement.appendChild(document.createElement('div'));

document.body.appendChild(newElement);
observarMudancaDeURL();
initializeContent();
minhaFuncao();

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.sectionSettings) {
      const newSettings = changes.sectionSettings.newValue;
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
      injectSections(newSettings);
    }

    if (changes.tokenrdsarion) {
      console.log("Tokenrdsarion foi atualizado.");
      minhaFuncao();
    }
  }
});
