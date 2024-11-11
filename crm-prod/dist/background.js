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
    'fetchActivities'
  ];

  if (validActions.includes(request.action)) {
    fetch(request.url, {
      method: 'GET',
      headers: request.headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => sendResponse({ success: true, data }))
    .catch(error => sendResponse({ success: false, error: error.message }));

    // Retorna true para indicar que a resposta será enviada de forma assíncrona
    return true;
  }
});
