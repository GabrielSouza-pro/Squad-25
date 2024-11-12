import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const sectionsList = [
  { id: 'empresas', label: ' Empresas' },
  { id: 'negociacoes', label: ' Negociações' },
  { id: 'produto_negociacoes', label: ' Produto das negociações' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'etapas_funil_vendas', label: ' Etapas do funil de vendas' },
  { id: 'tarefas', label: ' Tarefas' },
  { id: 'anotacoes', label: ' Anotações' },
  { id: 'fontes', label: ' Fontes' },
  { id: 'campanhas', label: ' Campanhas' },
];

function App() {
  const [tokenrdsarion, setTokenrdsarion] = useState('');
  const [settings, setSettings] = useState({});

  useEffect(() => {
    chrome.storage.local.get(['tokenrdsarion', 'sectionSettings'], (result) => {
      if (result.tokenrdsarion) {
        setTokenrdsarion(result.tokenrdsarion);
      }
      if (result.sectionSettings) {
        setSettings(result.sectionSettings);
      } else {
        const initialSettings = {};
        sectionsList.forEach(section => {
          initialSettings[section.id] = true;
        });
        setSettings(initialSettings);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({ tokenrdsarion, sectionSettings: settings }, () => {
      console.log('Configurações salvas:', { tokenrdsarion, settings });
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
        <label className="textos-baixos w" htmlFor="token-input">Token:</label>
        <input 
          id="token-input"
          type="text" 
          placeholder="Seu token aqui" 
          value={tokenrdsarion} 
          onChange={(e) => setTokenrdsarion(e.target.value)} 
        />
      </div>

      <div className='w'>
        <h2>Ativar/Desativar Seções</h2>
        <div className="switch-group checkbox-group">
          {sectionsList.map(section => (
            <div key={section.id} className="flex items-center space-x-2">
              <Switch 
                id={`switch-${section.id}`} 
                checked={!!settings[section.id]} 
                onCheckedChange={() => handleToggle(section.id)} 
              />
              <Label htmlFor={`switch-${section.id}`}>{section.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button id="salvar" onClick={handleSave}>Salvar</Button>
      <div id="divisao"></div>
    </div>
  );
}

export default App;
