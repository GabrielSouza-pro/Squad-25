// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
  ];

  // Verifica se a ação não é válida
  if (!validActions.includes(request.action)) {
    sendResponse({ success: false, error: 'Ação inválida' });
    return;
  }

  // Tratamento para ações válidas
  if (request.action === 'REQUEST_TOKEN') {
    chrome.storage.local.get(['tokenContent'], result => {
      sendResponse(result.tokenContent ? { tokenContent: result.tokenContent } : {});
    });
    return true; // Conexão assíncrona para REQUEST_TOKEN
  }

  const { url, headers, payload, params } = request;

  // Configurações de fetch para outras ações
  const fetchOptions = {
    method: request.action === 'saveAdminSettings' ? 'POST' : 'GET',
    headers,
  };

  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const fetchUrl =
    request.action === 'fetchAdminSettings' && params
      ? `${url}?${params}`
      : url;

  fetch(fetchUrl, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => sendResponse({ success: true, data }))
    .catch(error => sendResponse({ success: false, error: error.message }));

  return true; // Conexão assíncrona para fetch
});
