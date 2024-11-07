//background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchData' || request.action === 'fetchDeals' || request.action === 'fetchDealProducts') {
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
    return true; // Indica que a resposta será enviada de forma assíncrona
  }
});
