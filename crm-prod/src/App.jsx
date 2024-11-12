import React, { useState, useEffect } from 'react';
import './App.css';

const sectionsList = [
  { id: 'empresas', label: 'Empresas' },
  { id: 'negociacoes', label: 'Negociações' },
  { id: 'produto_negociacoes', label: 'Produto das negociações' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'etapas_funil_vendas', label: 'Etapas do funil de vendas' },
  { id: 'tarefas', label: 'Tarefas' },
  { id: 'anotacoes', label: 'Anotações' },
  { id: 'fontes', label: 'Fontes' },
  { id: 'campanhas', label: 'Campanhas' },
];

function App() {
  const [tokenrdsarion, setTokenrdsarion] = useState('');
  const [settings, setSettings] = useState({});

  // Carregar token e configurações ao montar o componente
  useEffect(() => {
    // Carregar token do chrome.storage.local
    chrome.storage.local.get(['tokenrdsarion', 'sectionSettings'], (result) => {
      if (result.tokenrdsarion) {
        setTokenrdsarion(result.tokenrdsarion);
      }
      if (result.sectionSettings) {
        setSettings(result.sectionSettings);
      } else {
        // Inicializar todas as seções como habilitadas
        const initialSettings = {};
        sectionsList.forEach(section => {
          initialSettings[section.id] = true;
        });
        setSettings(initialSettings);
      }
    });
  }, []);

  const handleSave = () => {
    // Salvar o token e as configurações no chrome.storage.local
    chrome.storage.local.set({ tokenrdsarion, sectionSettings: settings }, () => {
      console.log('Configurações salvas:', { tokenrdsarion, settings });
      // Recarregar a aba ativa para aplicar as novas configurações
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  };

  const handleToggle = (id) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [id]: !prevSettings[id]
    }));
  };

  return (
    <div className="App">
      <h1 className="crm-titulo">CRM Config</h1>
      <hr id="hr1" />
      <div>
        <label className="textos-baixos" htmlFor="token-input">Token:</label>
        <input 
          id="token-input"
          type="text" 
          placeholder="Seu token aqui" 
          value={tokenrdsarion} 
          onChange={(e) => setTokenrdsarion(e.target.value)} 
        />
      </div>

      <div>
        <h2>Ativar/Desativar Seções</h2>
        <div className="checkbox-group">
          {sectionsList.map(section => (
            <label key={section.id} htmlFor={`checkbox-${section.id}`}>
              <input 
                type="checkbox" 
                id={`checkbox-${section.id}`}
                checked={!!settings[section.id]} 
                onChange={() => handleToggle(section.id)} 
              />
              {section.label}
            </label>
          ))}
        </div>
      </div>

      <button id="salvar" onClick={handleSave}>Salvar</button>
      <div id="divisao"></div>
    </div>
  );
}

export default App;