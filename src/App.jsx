// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AdminSettings from './AdminSettings'; // Novo componente

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

const departmentsList = ['Suporte', 'Financeiro', 'Departamento 1', 'RH'];

function App() {
  const [tokenrdsarion, setTokenrdsarion] = useState('');
  const [tokenContent, setTokenContent] = useState('');
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [adminSettings, setAdminSettings] = useState({});
  const [userAdminSettings, setUserAdminSettings] = useState({});
  const [userSettings, setUserSettings] = useState(null);
  const [userQueue, setUserQueue] = useState('');
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [queueError, setQueueError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(departmentsList[0]);
  const [userSettingsLoaded, setUserSettingsLoaded] = useState(false);

  // Função para solicitar o token ao background script
  const solicitarToken = () => {
    chrome.runtime.sendMessage({ type: 'REQUEST_TOKEN', action: 'REQUEST_TOKEN' }, (response) => {
      if (response && response.tokenContent) {
        setTokenContent(response.tokenContent);
        console.log('Token recebido e atualizado:', response.tokenContent);
      } else {
        console.log('Token não recebido na solicitação.');
      }
    });
  };

  // Inicialização: Recupera tokens e configurações do chrome.storage.local
  useEffect(() => {
    chrome.storage.local.get(['tokenrdsarion', 'userSettings', 'tokenContent'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Erro ao recuperar dados do storage:', chrome.runtime.lastError);
        return;
      }
      console.log('Dados recuperados do storage:', result);
  
      if (result.tokenrdsarion) {
        setTokenrdsarion(result.tokenrdsarion);
      }
      if (result.tokenContent) {
        setTokenContent(result.tokenContent);
      }
      if (result.userSettings) {
        setUserSettings(result.userSettings);
      } else {
        setUserSettings({});
      }
      setUserSettingsLoaded(true); // Indica que o carregamento foi concluído
    });
  }, []);

  // Decodifica o token JWT quando tokenContent é atualizado
  useEffect(() => {
    if (tokenContent) {
      try {
        const decoded = jwtDecode(tokenContent);
        setDecodedPayload(decoded);
        console.log('Payload do Token:', decoded);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
      }
    }
  }, [tokenContent]);

  // Função para buscar dados do usuário na API via background script
  const fetchUserQueue = async (userId) => {
    setIsLoadingQueue(true);
    setQueueError(null);

    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            action: 'fetchData',
            url: 'https://chatapi.jetsalesbrasil.com/users/',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenContent}`,
            },
          },
          (res) => {
            resolve(res);
          }
        );
      });

      if (response.success && response.data) {
        const data = response.data;
        console.log('Dados da API:', data);

        const user = data.users.find((user) => user.id === userId);

        if (user && user.queues && user.queues.length > 0) {
          setUserQueue(user.queues[0].queue);
        } else {
          setUserQueue('Nenhum departamento encontrado para o usuário.');
        }
      } else {
        throw new Error(response.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setQueueError(error.message);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  // useEffect para buscar o departamento do usuário quando o payload é decodificado e o perfil é 'user'
  useEffect(() => {
    if (decodedPayload && decodedPayload.profile === 'user') {
      const userId = decodedPayload.id;
      console.log(`Buscando departamento para o usuário com ID: ${userId}`);
      fetchUserQueue(userId);
    }
  }, [decodedPayload]);

  // Função para buscar as configurações administrativas via background script
  const fetchAdminSettings = async (department, isUser = false) => {
    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            action: 'fetchAdminSettings',
            url: 'https://27t3grrlv2.execute-api.us-east-1.amazonaws.com/prod',
            params: `department=${encodeURIComponent(department)}`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenContent}`,
            },
          },
          (res) => {
            resolve(res);
          }
        );
      });

      if (response.success && response.data) {
        const { department: dept, fields } = response.data;
        console.log('Configurações Admin Recebidas:', response.data);

        if (dept && Array.isArray(fields)) {
          const settingsObj = {};
          sectionsList.forEach((section) => {
            settingsObj[section.id] = fields.includes(section.id);
          });
          if (isUser) {
            setUserAdminSettings(settingsObj); // Configurações para usuário
          } else {
            setAdminSettings(settingsObj); // Configurações para admin
          }
        } else {
          console.error('Resposta da API está em um formato inesperado:', response.data);
          if (isUser) {
            setUserAdminSettings({});
          } else {
            setAdminSettings({});
          }
        }
      } else {
        throw new Error(response.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao buscar configurações administrativas:', error);
      if (isUser) {
        setUserAdminSettings({});
      } else {
        setAdminSettings({});
      }
    }
  };

  // useEffect para buscar as configurações administrativas quando o departamento selecionado ou tokenContent mudar (admin)
  useEffect(() => {
    if (tokenContent && selectedDepartment && decodedPayload && decodedPayload.profile === 'admin') {
      fetchAdminSettings(selectedDepartment, false); // `false` indica que é para admin
    }
  }, [tokenContent, selectedDepartment, decodedPayload]);

  // useEffect para buscar as configurações administrativas do departamento do usuário (para user)
  useEffect(() => {
    if (userQueue && userQueue !== 'Nenhum departamento encontrado para o usuário.') {
      console.log(`Buscando configurações administrativas para o departamento: ${userQueue}`);
      fetchAdminSettings(userQueue, true); // `true` indica que é para user
    }
  }, [userQueue]);

// useEffect para atualizar userSettings quando userAdminSettings mudar
useEffect(() => {
  if (userAdminSettings && userSettingsLoaded) {
    setUserSettings((prevUserSettings) => {
      const updatedUserSettings = { ...prevUserSettings };

      // Adiciona ou atualiza seções permitidas pelo administrador
      for (let sectionId in userAdminSettings) {
        if (userAdminSettings[sectionId]) {
          if (!updatedUserSettings.hasOwnProperty(sectionId)) {
            // Se o usuário não tinha essa seção, adiciona com o valor padrão
            updatedUserSettings[sectionId] = true; // Ou false, dependendo do seu padrão
          }
          // Se o usuário já tinha essa seção, mantém o valor atual
        } else {
          // Seção não é mais permitida pelo administrador, remove do userSettings
          if (updatedUserSettings.hasOwnProperty(sectionId)) {
            delete updatedUserSettings[sectionId];
          }
        }
      }

      // Salva as configurações atualizadas no chrome.storage.local
      chrome.storage.local.set(
        {
          userSettings: updatedUserSettings,
          sectionSettings: updatedUserSettings,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error('Erro ao salvar configurações atualizadas:', chrome.runtime.lastError);
          } else {
            console.log('Configurações atualizadas salvas:', updatedUserSettings);
            // Notifica o content script para recarregar as seções
            chrome.runtime.sendMessage({ action: 'updateSections' });
          }
        }
      );

      return updatedUserSettings;
    });
  }
}, [userAdminSettings, userSettingsLoaded]);


  // Função para salvar as configurações administrativas via background script
  const saveAdminSettings = async () => {
    try {
      const fieldsToSave = sectionsList
        .filter((section) => adminSettings[section.id])
        .map((section) => section.id);

      const payload = {
        department: selectedDepartment,
        fields: fieldsToSave,
      };

      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            action: 'saveAdminSettings',
            url: 'https://27t3grrlv2.execute-api.us-east-1.amazonaws.com/prod',
            payload,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenContent}`,
            },
          },
          (res) => {
            resolve(res);
          }
        );
      });

      if (response.success) {
        console.log('Resposta da API:', response.data);
        // Busca as configurações atualizadas
        fetchAdminSettings(selectedDepartment, false);
      } else {
        throw new Error(response.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações administrativas:', error);
    }
  };

  // Salva as configurações do usuário no chrome.storage.local
  const handleSaveUserSettings = () => {
    chrome.storage.local.set(
      {
        tokenrdsarion,
        sectionSettings: userSettings,
        userSettings,
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error('Erro ao salvar configurações:', chrome.runtime.lastError);
        } else {
          console.log('Configurações salvas:', { tokenrdsarion, userSettings });
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
              chrome.tabs.reload(tabs[0].id);
            }
          });
        }
      }
    );
  };

  // Alterna o estado das seções para o usuário
  const handleUserToggle = (sectionId, checked) => {
    console.log(`Alternando userSettings: ${sectionId} = ${checked}`);
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [sectionId]: checked,
    }));
  };

  // Lida com mensagens recebidas do background script
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === 'SET_TOKEN_CONTENT') {
        setTokenContent(message.tokenContent);
        console.log('TokenContent recebido via mensagem:', message.tokenContent);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // Listener para mudanças no chrome.storage.local
  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      if (area === 'local') {
        if (changes.tokenContent && changes.tokenContent.newValue) {
          setTokenContent(changes.tokenContent.newValue);
          console.log('TokenContent atualizado via storage change:', changes.tokenContent.newValue);
        }
        if (changes.tokenrdsarion) {
          setTokenrdsarion(changes.tokenrdsarion.newValue);
          console.log('Tokenrdstation atualizado via storage change:', changes.tokenrdsarion.newValue);
        }
        if (changes.userSettings) {
          setUserSettings(changes.userSettings.newValue);
          console.log('UserSettings atualizado via storage change:', changes.userSettings.newValue);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Inicializa o listener para receber o token
  useEffect(() => {
    if (!tokenContent) {
      console.log('Tentando solicitar o token...');
      solicitarToken();
    }
  }, [tokenContent]);

  return (
    <div className="App">
      <h1 className="crm-titulo">CRM Config</h1>
      <hr id="hr1" />

      <div>
        <label className="textos-baixos w" htmlFor="token-input">
          Token RDStation:
        </label>
        <input
          id="token-input"
          type="text"
          placeholder="Seu token aqui"
          value={tokenrdsarion}
          onChange={(e) => setTokenrdsarion(e.target.value)}
        />
      </div>

      {/* Renderização Condicional com Base no Profile (admin) */}
      {decodedPayload && decodedPayload.profile === 'admin' && (
        <AdminSettings
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          adminSettings={adminSettings}
          handleAdminToggle={(sectionId, checked) =>
            setAdminSettings((prevSettings) => ({
              ...prevSettings,
              [sectionId]: checked,
            }))
          }
          sectionsList={sectionsList}
          departmentsList={departmentsList}
          saveAdminSettings={saveAdminSettings}
        />
      )}

      {decodedPayload && decodedPayload.profile === 'user' && (
        <>
          {/* Indicadores de status */}
          {isLoadingQueue && <p className="w">Carregando departamento...</p>}
          {queueError && <p className="error">{queueError}</p>}

          {/* Renderização das seções para usuários com base no departamento */}
          {userQueue && userQueue !== 'Nenhum departamento encontrado para o usuário.' && (
            <div className="user-sections w">
              <h2>Seções Disponíveis</h2>
              <div className="sections-list">
                {sectionsList
                  .filter((section) => userAdminSettings[section.id]) // Usa as configurações do departamento do usuário
                  .map((section) => (
                    <div key={section.id} className="section-item flex items-center space-x-2">
                      <Switch
                        id={`switch-user-${section.id}`}
                        checked={!!userSettings[section.id]}
                        onCheckedChange={(checked) => handleUserToggle(section.id, checked)}
                        className="section-switch"
                      />
                      <Label htmlFor={`switch-user-${section.id}`} className="section-label">
                        {section.label}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}

      <Button
        id="salvar-usuario"
        onClick={() => {
          handleSaveUserSettings();
          // (admin)
          if (decodedPayload && decodedPayload.profile === 'admin') {
            saveAdminSettings();
          }
        }}
      >
        Salvar
      </Button>
    </div>
  );
}

export default App;
