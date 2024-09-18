// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão CRM instalada!");
  });
  
  // Você pode adicionar mais listeners ou funções aqui
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'index.html' }); // Abre o popup ao clicar no ícone
  });
  