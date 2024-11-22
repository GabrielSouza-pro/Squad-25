// background.js

// Função para verificar se uma ação é válida
const isValidAction = (action) => {
  const validActions = [
    'fetchData',
    'fetchDeals',
    'fetchDealProducts',
    'fetchOrganizations',
    'fetchProducts',
    'fetchDealStages',
    'fetchTasks',
    'fetchActivities',
    'fetchAdminSettings',
    'saveAdminSettings',
    'REQUEST_TOKEN',
    'paginaCarregada', // Ação para detectar evento de load
  ];
  return validActions.includes(action);
};

// Listener para mensagens recebidas
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, url, headers, payload, params } = request;

  // Verifica se a ação é válida
  if (!isValidAction(action)) {
    sendResponse({ success: false, error: 'Ação inválida' });
    return;
  }

  switch (action) {
    case 'REQUEST_TOKEN':
      // Recupera o token do chrome.storage.local
      chrome.storage.local.get(['tokenContent'], (result) => {
        if (chrome.runtime.lastError) {
          console.error('Erro ao recuperar tokenContent:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          if (result.tokenContent) {
            sendResponse({ success: true, tokenContent: result.tokenContent });
          } else {
            sendResponse({ success: false, error: 'tokenContent não encontrado.' });
          }
        }
      });
      return true; // Indica que a resposta será enviada de forma assíncrona

      case 'paginaCarregada':
        // Quando a página dispara o evento de load
        console.log('Recebido aviso de load da página.');
  
        // Verifica se o popup já está aberto para evitar múltiplas aberturas
        chrome.storage.local.get(['popupAberto', 'popupWindowId'], (result) => {
          if (!result.popupAberto) {
            // Cria a janela popup com 1x1 pixel
            chrome.windows.create({
              url: chrome.runtime.getURL('index.html'), // Usando 'index.html' como popup
              type: 'normal', // Tipo 'normal' para permitir manipulação do estado
              width: 1,       // Largura de 1 pixel
              height: 1,      // Altura de 1 pixel
              bottom: 100000000,
              focused: false
            }, (window) => {
              if (chrome.runtime.lastError) {
                console.error('Erro ao criar janela popup:', chrome.runtime.lastError);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
                return;
              }
  
              console.log('Popup aberto automaticamente com window ID:', window.id);
              // Marca que o popup está aberto e armazena o windowId
              chrome.storage.local.set({ popupAberto: true, popupWindowId: window.id }, () => {
                console.log('Estado do popup atualizado para aberto.');
  
                // Tenta minimizar a janela
                chrome.windows.update(window.id, { state: 'minimized' }, () => {
                  if (chrome.runtime.lastError) {
                    console.error('Erro ao minimizar a janela:', chrome.runtime.lastError);
                  } else {
                    console.log('Janela minimizada com sucesso.');
                  }
  
                  // Fecha a janela após 1 segundo (1000 ms)
                  setTimeout(() => {
                    chrome.windows.remove(window.id, () => {
                      if (chrome.runtime.lastError) {
                        console.error('Erro ao fechar a janela popup:', chrome.runtime.lastError);
                      } else {
                        console.log('Popup fechado automaticamente após 1 segundo.');
                      }
                      // Marca que o popup foi fechado
                      chrome.storage.local.set({ popupAberto: false, popupWindowId: null }, () => {
                        console.log('Estado do popup atualizado para fechado.');
                      });
                    });
                  }, 3000); // 1000 ms = 1 segundo
                });
              });
            });
          } else {
            console.log('Popup já está aberto com window ID:', result.popupWindowId);
            sendResponse({ success: true, status: 'Popup já estava aberto.' });
          }
        });

      return true; // Indica que a resposta será enviada de forma assíncrona

    default:
      // Tratamento para ações de fetch e outras operações
      handleFetchActions(action, url, headers, payload, params, sendResponse);
      return true; // Indica que a resposta será enviada de forma assíncrona
  }
});

// Função para tratar ações de fetch e outras operações
function handleFetchActions(action, url, headers, payload, params, sendResponse) {
  // Define o método HTTP com base na ação
  const method = action === 'saveAdminSettings' ? 'POST' : 'GET';

  // Configura as opções de fetch
  const fetchOptions = {
    method: method,
    headers: headers || {},
  };

  // Adiciona o corpo da requisição se houver payload
  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  // Constrói a URL completa com parâmetros, se necessário
  let fetchUrl = url;
  if (action === 'fetchAdminSettings' && params) {
    fetchUrl = `${url}?${params}`;
  }

  // Executa a requisição fetch
  fetch(fetchUrl, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      sendResponse({ success: true, data: data });
    })
    .catch(error => {
      console.error(`Erro ao executar a ação ${action}:`, error);
      sendResponse({ success: false, error: error.message });
    });
}

// Listener para quando uma janela é fechada
chrome.windows.onRemoved.addListener((windowId) => {
  // Recupera o windowId armazenado
  chrome.storage.local.get(['popupWindowId'], (result) => {
    if (result.popupWindowId && result.popupWindowId === windowId) {
      // Marca que o popup foi fechado
      chrome.storage.local.set({ popupAberto: false, popupWindowId: null }, () => {
        console.log('Popup foi fechado e estado atualizado para false.');
      });
    }
  });
});
