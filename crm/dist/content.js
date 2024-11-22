// ===== SEÇÃO 1: Inicialização e Definição de Propriedades =====

// Log para confirmar a injeção do script
console.log("JavaScript injetado em uma página!");

// Definindo propriedades globais
window.user_idre = null;
window.deals_idre = ''; // Alterado de array para string
let numerodetellValue = null;

// Propriedades adicionais para armazenar os IDs extraídos
window.organization_segments_ids = [];
window.deal_source_id = null;
window.campaign_id = null;

// Propriedades para armazenar tarefas
window.deal_tasks = [];

// Propriedades para armazenar atividades
window.deal_activities = [];

// Definindo getter e setter para a propriedade 'numerodetell'
Object.defineProperty(window, 'numerodetell', {
  get: function () {
    return numerodetellValue;
  },
  set: function (value) {
    if (numerodetellValue !== value) {
      console.log(`numerodetell mudou de ${numerodetellValue} para ${value}`);
      numerodetellValue = value;
      tratarMudancaNumeroTelefone(value); // Chama função para lidar com a mudança
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
function tratarMudancaNumeroTelefone(newNumber) {
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
        if (response && response.success) { // Safe check
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

            // Verifica e extrai os IDs dos deals
            if (contact.deals && contact.deals.length > 0) {
              window.deals_idre = contact.deals.map(deal => deal.id || deal._id).join(', '); // Convertido para string
              console.log("deals_idre atualizado para:", window.deals_idre);
              
              // Após obter os deal_id, realiza a requisição adicional para cada deal
              const dealIds = window.deals_idre.split(',').map(id => id.trim());
              dealIds.forEach(dealId => {
                if (dealId) {
                  buscarDetalhesNegociacao(tokenrdsarion, dealId);
                }
              });
              
            } else {
              console.log("Nenhum deal encontrado para o contato.");
              window.deals_idre = ''; // Limpa a variável caso não haja deals
            }
          } else {
            console.log("Nenhum contato encontrado.");
            window.user_idre = null;
            window.deals_idre = '';
          }
        } else {
          console.error('Houve um problema com a operação fetch:', response ? response.error : 'No response');
        }
      }
    );
  });
}

/**
 * Função para buscar detalhes de um deal específico
 * @param {string} token - Token do RD Station
 * @param {string} dealId - ID do deal
 */
function buscarDetalhesNegociacao(token, dealId) {
  // Corrigindo o parâmetro da API para 'deal_pipeline_id' se necessário
  const apiUrl = `https://crm.rdstation.com/api/v1/deals?token=${token}&deal_id=${dealId}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchDeals',
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Safe check
        const dealData = response.data;
        console.log(`Detalhes do Deal (${dealId}):`, dealData);
        if (dealData.total > 0 && dealData.deals && dealData.deals.length > 0) {
          const deal = dealData.deals[0];

          // Extraindo ID dos organization_segments
          if (deal.organization && deal.organization.organization_segments) {
            window.organization_segments_ids = deal.organization.organization_segments.map(segment => segment.id);
            console.log("IDs de organization_segments:", window.organization_segments_ids);
          } else {
            console.error("organization_segments não encontrados no deal.");
          }

          // Extraindo ID do deal_source
          if (deal.deal_source && deal.deal_source.id) {
            window.deal_source_id = deal.deal_source.id;
            console.log("ID do deal_source:", window.deal_source_id);
          } else {
            console.error("deal_source não encontrado no deal.");
          }

          // Extraindo ID da campaign
          if (deal.campaign && deal.campaign.id) {
            window.campaign_id = deal.campaign.id;
            console.log("ID da campaign:", window.campaign_id);
          } else {
            console.error("campaign não encontrada no deal.");
          }

          // ===== EXTRACAO DO NOME DA CAMPAIN =====
          if (deal.campaign && deal.campaign.name) {
            const campaignName = deal.campaign.name;
            console.log("Nome da campanha:", campaignName);

            const campanhasContainer = document.getElementById('campanhas-content');
            if (campanhasContainer) {
              // Limpa o conteúdo anterior
              campanhasContainer.innerHTML = '';

              // Cria um div-item
              const divItem = document.createElement('div');
              divItem.classList.add('div-item');

              // Cria h3-title com o nome da campanha
              const divTitle = document.createElement('h3');
              divTitle.classList.add('div-title');
              divTitle.innerText = `Campanha: ${campaignName || 'Nome da Campanha não disponível'}`;
              divItem.appendChild(divTitle);

              // Adiciona o div-item ao container
              campanhasContainer.appendChild(divItem);
            } else {
              console.error("'campanhas-content' não encontrado.");
            }
          } else {
            console.error("campaign.name não encontrado no deal.");
          }
          // ===== FIM DA EXTRACAO DO NOME DA CAMPAIN =====

          // ===== NOVA SEÇÃO: Extração de 'markup' e 'name' da organização =====
          const markup = deal.markup || 'N/A';
          const organizationName = (deal.organization && deal.organization.name) ? deal.organization.name : 'N/A';

          // Seleciona o container da seção 'Negociações'
          const negociacoesContainer = document.getElementById('negociacoes-container');
          if (negociacoesContainer) {
            // Limpa o conteúdo anterior
            negociacoesContainer.innerHTML = '';

            // Cria um div-item
            const divItem = document.createElement('div');
            divItem.classList.add('div-item'); // Adicionado

            // Cria h3-title com o nome do deal para consistência
            const divTitle = document.createElement('h3');
            divTitle.classList.add('div-title'); // Adicionado
            divTitle.innerText = `Negociação: ${deal.name || 'Nome do Deal não disponível'}`;
            divItem.appendChild(divTitle);

            // Cria elementos para 'Markup'
            const markupElement = document.createElement('p');
            markupElement.innerHTML = `<strong>Markup:</strong> ${markup}`;
            divItem.appendChild(markupElement);

            // Cria elementos para 'Nome da Organização'
            const orgNameElement = document.createElement('p');
            orgNameElement.innerHTML = `<strong>Nome da Organização:</strong> ${organizationName}`;
            divItem.appendChild(orgNameElement);

            // Adiciona o div-item ao container
            negociacoesContainer.appendChild(divItem);
          } else {
            console.error("'negociacoes-container' não encontrado.");
          }
          // ===== FIM DA NOVA SEÇÃO =====

          // ===== NOVA SEÇÃO: Extração e Exibição do Nome do Deal Source =====
          if (deal.deal_source && deal.deal_source.name) {
            const dealSourceName = deal.deal_source.name;
            console.log("Nome do deal_source:", dealSourceName);
            // Exibe no 'fontes-container'
            const fontesContainer = document.getElementById('fontes-content');
            if (fontesContainer) {
              // Limpa o conteúdo anterior
              fontesContainer.innerHTML = '';

              // Cria div-item
              const divItem = document.createElement('div');
              divItem.classList.add('div-item');

              // Cria div-title
              const divTitle = document.createElement('h3');
              divTitle.classList.add('div-title');
              divTitle.innerText = 'Fonte do Cliente';
              divItem.appendChild(divTitle);

              // Cria p element com dealSourceName
              const p = document.createElement('p');
              p.innerHTML = `<strong>Fonte do Cliente:</strong> ${dealSourceName}`;
              divItem.appendChild(p);

              // Adiciona o div-item ao container
              fontesContainer.appendChild(divItem);
            } else {
              console.error("'fontes-content' não encontrado.");
            }
          } else {
            console.error("deal_source.name não encontrado no deal.");
          }
          // ===== FIM DA NOVA SEÇÃO =====

          // ===== NOVA SEÇÃO: Busca de Etapas do Funil de Vendas =====
          if (deal.deal_source && deal.deal_source.id && token) {
            buscarEtapasFunilVendas(token, deal.deal_source.id); // Passa o pipelineId corretamente
          } else {
            console.error("deal_pipeline.id ou token não disponíveis para buscar etapas do funil de vendas.");
          }
          // ===== FIM DA NOVA SEÇÃO =====

          // Após obter os detalhes do deal, buscar os produtos associados a ele
          if (dealId && token) {
            buscarProdutosNegociacao(token, dealId);
          }

          // ===== NOVA SEÇÃO: Buscar Tarefas do Deal =====
          if (dealId && token) {
            buscarTarefasNegociacao(token, dealId);
          }
          // ===== FIM DA NOVA SEÇÃO =====

          // ===== NOVA SEÇÃO: Buscar Atividades do Deal =====
          if (dealId && token) {
            buscarAtividadesNegociacao(token, dealId);
          }
          // ===== FIM DA NOVA SEÇÃO =====

        } else {
          console.log(`Nenhum deal encontrado para o ID: ${dealId}`);
        }
      } else {
        console.error(`Erro ao buscar detalhes do Deal (${dealId}):`, response ? response.error : 'No response');
      }
    }
  );
}

/**
 * Função para buscar etapas do funil de vendas usando o deal_pipeline_id
 * @param {string} token - Token do RD Station
 * @param {string} pipelineId - ID do pipeline
 */
function buscarEtapasFunilVendas(token, pipelineId) {
  // Atualiza a URL para usar 'deal_pipeline_id' em vez de 'deal_id'
  const apiUrl = `https://crm.rdstation.com/api/v1/deal_stages?token=${token}&deal_pipeline_id=${pipelineId}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchDealStages',
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Verificação de segurança
        const dealStages = response.data.deal_stages || response.data; // Ajuste conforme a estrutura da resposta
        console.log('Deal Stages:', dealStages);

        // Seleciona o container
        const etapasFunilVendasContainer = document.getElementById('etapas_funil_vendas-container');
        if (etapasFunilVendasContainer) {
          etapasFunilVendasContainer.innerHTML = ''; // Limpa conteúdo anterior

          if (dealStages && dealStages.length > 0) {
            dealStages.forEach(stage => {
              const stageDiv = document.createElement('div');
              stageDiv.classList.add('div-item'); // Adicionado

              const pipelineName = (stage.deal_pipeline && stage.deal_pipeline.name) ? stage.deal_pipeline.name : 'N/A';
              const objective = (stage.objective !== null) ? stage.objective : 'N/A';

              const stageInfo = `
                <p><strong>Tipo do Funil:</strong> ${pipelineName}</p>
                <p><strong>Objetivo:</strong> ${objective}</p>
              `;

              // Cria h3-title para a etapa
              const stageTitle = document.createElement('h3');
              stageTitle.classList.add('div-title'); // Adicionado
              stageTitle.innerText = `Etapa: ${pipelineName}`;
              stageDiv.appendChild(stageTitle);

              stageDiv.innerHTML += stageInfo;
              etapasFunilVendasContainer.appendChild(stageDiv);
            });
          } else {
            etapasFunilVendasContainer.innerText = 'Nenhuma etapa encontrada para este funil de vendas.';
          }
        } else {
          console.error("'etapas_funil_vendas-container' não encontrado.");
        }
      } else {
        console.error(`Erro ao buscar etapas do funil de vendas:`, response ? response.error : 'Nenhuma resposta');
      }
    }
  );
}

/**
 * Função para buscar produtos de uma negociação específica
 * @param {string} token - Token do RD Station
 * @param {string} dealId - ID da negociação
 */
function buscarProdutosNegociacao(token, dealId) {
  const apiUrl = `https://crm.rdstation.com/api/v1/deals/${dealId}/deal_products?token=${token}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchDealProducts',
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Safe check
        const dealProducts = response.data.deal_products;
        console.log(`Produtos da Negociação (${dealId}):`, dealProducts);

        // Seleciona o container da seção 'produto_negociacoes'
        const produtoNegociacoesContainer = document.getElementById('produto_negociacoes-content');
        if (produtoNegociacoesContainer) {
          // Limpa o conteúdo anterior
          produtoNegociacoesContainer.innerHTML = '';

          if (dealProducts && dealProducts.length > 0) {
            dealProducts.forEach((product, index) => {
              const productDiv = document.createElement('div');
              productDiv.classList.add('div-item'); // Adicionado

              const productTitle = document.createElement('h3');
              productTitle.classList.add('div-title'); // Adicionado
              productTitle.innerText = `Produto ${index + 1}: ${product.name || 'N/A'}`;
              productDiv.appendChild(productTitle);

              // Tradução do valor de recorrência
              let recorrenciaTraduzida = 'N/A';
              if (product.recurrence === 'spare') {
                recorrenciaTraduzida = 'Único';
              } else if (product.recurrence === 'monthly') {
                recorrenciaTraduzida = 'Mensal';
              }

              const productDetails = document.createElement('p');
              productDetails.classList.add('product-details'); // Adiciona a classe para estilização
              productDetails.innerHTML = `
                <strong>Preço:</strong> ${product.price !== undefined ? `R$ ${parseFloat(product.price).toFixed(2)}` : 'N/A'}<br>
                <strong>Desconto:</strong> ${product.discount !== undefined ? `${product.discount}%` : 'N/A'}<br>
                <strong>Quantidade:</strong> ${product.amount !== undefined ? product.amount : 'N/A'}<br>
                <strong>Total:</strong> ${product.total !== undefined ? `R$ ${parseFloat(product.total).toFixed(2)}` : 'N/A'}<br>
                <strong>Descrição:</strong> ${product.description || 'N/A'}<br>
                <strong>Recorrência:</strong> ${recorrenciaTraduzida}
              `;
              productDiv.appendChild(productDetails);

              produtoNegociacoesContainer.appendChild(productDiv);
            });
          } else {
            const p = document.createElement('p');
            p.innerText = 'Nenhum produto encontrado para este negócio.';
            p.classList.add('div-item', 'div-title'); // Adicionado
            produtoNegociacoesContainer.appendChild(p);
          }
        } else {
          console.error("O container 'produto_negociacoes-content' não foi encontrado.");
        }

        // ===== INÍCIO DA NOVA SEÇÃO: Busca de Organizações =====

        // Verifica se há organization_segments_ids disponíveis
        if (window.organization_segments_ids && window.organization_segments_ids.length > 0) {
          window.organization_segments_ids.forEach(segmentId => {
            if(segmentId) { // Verifica se segmentId não está vazio
              buscarOrganizacoes(token, segmentId);
            }
          });
        } else {
          console.log("Nenhum organization_segment_id disponível para buscar organizações.");
          const organizacoesContainer = document.getElementById('empresas-content'); // Atualizado para 'empresas-content'
          if (organizacoesContainer) {
            organizacoesContainer.innerHTML = '<p class="div-item div-title">Nenhum segmento de organização disponível.</p>';
          }
        }

        // ===== FIM DA NOVA SEÇÃO: Busca de Organizações =====
      } else {
        console.error(`Erro ao buscar produtos da Negociação (${dealId}):`, response ? response.error : 'No response');
      }
    }
  );
}

/**
 * Função para buscar produtos gerais do RD Station
 * @param {string} token - Token do RD Station
 */
function buscarProdutos(token) {
  const apiUrl = `https://crm.rdstation.com/api/v1/products?token=${token}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchProducts',
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) {
        const productsData = response.data;
        console.log("Produtos recebidos:", productsData);

        const produtosContainer = document.getElementById('produtos-container');
        if (produtosContainer) {
          // Limpa o conteúdo anterior
          produtosContainer.innerHTML = '';

          if (productsData.total > 0 && productsData.products && productsData.products.length > 0) {
            productsData.products.forEach((product, index) => {
              const productDiv = document.createElement('div');
              productDiv.classList.add('div-item'); // Adicionado

              const productTitle = document.createElement('h3');
              productTitle.classList.add('div-title'); // Adicionado
              productTitle.innerText = `Produto ${index + 1}: ${product.name || 'N/A'}`;
              productDiv.appendChild(productTitle);

              const productDetails = document.createElement('p');
              productDetails.classList.add('product-details'); // Adiciona a classe para estilização
              productDetails.innerHTML = `
                <strong>Descrição:</strong> ${product.description || 'N/A'}<br>
                <strong>Preço Base:</strong> ${product.base_price !== undefined ? `R$ ${parseFloat(product.base_price).toFixed(2)}` : 'N/A'}
              `;
              productDiv.appendChild(productDetails);

              produtosContainer.appendChild(productDiv);
            });
          } else {
            const p = document.createElement('p');
            p.innerText = 'Nenhum produto encontrado.';
            p.classList.add('div-item', 'div-title'); // Adicionado
            produtosContainer.appendChild(p);
          }
        } else {
          console.error("O container 'produtos-container' não foi encontrado.");
        }
      } else {
        console.error(`Erro ao buscar produtos:`, response ? response.error : 'No response');
      }
    }
  );
}

/**
 * Função para buscar organizações com base no segmento
 * @param {string} token - Token do RD Station
 * @param {string} organizationSegmentId - ID do segmento de organização
 */
function buscarOrganizacoes(token, organizationSegmentId) {
  const apiUrl = `https://crm.rdstation.com/api/v1/organizations?token=${token}&organization_segment=${organizationSegmentId}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchOrganizations', // Ação correta
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Safe check
        const data = response.data;
        console.log(`Resposta da API de Organizações para o segmento (${organizationSegmentId}):`, data);

        const organizacoesContainer = document.getElementById('empresas-content');
        if (organizacoesContainer) {
          // Limpa o conteúdo anterior ou adiciona novo conteúdo
          organizacoesContainer.innerHTML = ''; // Você pode ajustar conforme a necessidade

          if (data.total > 0 && data.organizations && data.organizations.length > 0) {
            data.organizations.forEach(org => {
              const orgDiv = document.createElement('div');
              orgDiv.classList.add('div-item'); // Adicionado

              const orgName = document.createElement('h3');
              orgName.classList.add('div-title'); // Adicionado
              orgName.innerText = `Organização: ${org.name || 'N/A'}`;
              orgDiv.appendChild(orgName);

              const orgDetails = document.createElement('p');
              orgDetails.classList.add('organization-details');
              const segmentsNames = org.organization_segments.map(seg => seg.name).join(', ') || 'N/A';
              orgDetails.innerHTML = `
                <strong>Resumo:</strong> ${org.resume || 'N/A'}<br>
                <strong>URL:</strong> <a href="https://${org.url}" target="_blank">${org.url || 'N/A'}</a><br>
                <strong>Segmento:</strong> ${segmentsNames}
              `;
              orgDiv.appendChild(orgDetails);

              organizacoesContainer.appendChild(orgDiv);
            });
          } else {
            const p = document.createElement('p');
            p.innerText = 'Nenhuma organização encontrada para este segmento.';
            p.classList.add('div-item', 'div-title'); // Adicionado
            organizacoesContainer.appendChild(p);
          }
        } else {
          console.error("O container 'empresas-content' não foi encontrado.");
        }
      } else {
        console.error(`Erro ao buscar organizações para o segmento (${organizationSegmentId}):`, response ? response.error : 'No response');
      }
    }
  );
}


// ===== NOVA SEÇÃO: Função para Buscar Tarefas =====

/**
 * Função para buscar tarefas de uma negociação específica
 * @param {string} token - Token do RD Station
 * @param {string} dealId - ID da negociação
 */
function buscarTarefasNegociacao(token, dealId) {
  const apiUrl = `https://crm.rdstation.com/api/v1/tasks?token=${token}&deal_id=${dealId}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchTasks',
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Safe check
        const tasksData = response.data;
        console.log(`Tarefas da Negociação (${dealId}):`, tasksData);

        // Seleciona o container da seção 'tarefas'
        const tarefasContainer = document.getElementById('tarefas-content');
        if (tarefasContainer) {
          // Limpa o conteúdo anterior
          tarefasContainer.innerHTML = '';

          if (tasksData.total > 0 && tasksData.tasks && tasksData.tasks.length > 0) {
            tasksData.tasks.forEach((task, index) => {
              const taskDiv = document.createElement('div');
              taskDiv.classList.add('div-item'); // Adicionado

              // Título da Tarefa
              const taskTitle = document.createElement('h3');
              taskTitle.classList.add('div-title'); // Adicionado
              taskTitle.innerText = `Tarefa ${index + 1}: ${task.subject || 'N/A'}`;
              taskDiv.appendChild(taskTitle);

              // Detalhes da Tarefa
              const taskDetails = document.createElement('p');
              taskDetails.classList.add('task-details'); // Adiciona a classe para estilização
              taskDetails.innerHTML = `
                <strong>Tipo:</strong> ${task.type || 'N/A'}<br>
                <strong>Concluída:</strong> ${task.done ? 'Sim' : 'Não'}<br>
                <strong>Notas:</strong> ${task.notes || 'N/A'}
              `;
              taskDiv.appendChild(taskDetails);

              tarefasContainer.appendChild(taskDiv);
            });
          } else {
            const p = document.createElement('p');
            p.innerText = 'Nenhuma tarefa encontrada para este negócio.';
            p.classList.add('div-item', 'div-title'); // Adicionado
            tarefasContainer.appendChild(p);
          }
        } else {
          console.error("O container 'tarefas-content' não foi encontrado.");
        }
      } else {
        console.error(`Erro ao buscar tarefas da Negociação (${dealId}):`, response ? response.error : 'No response');
      }
    }
  );
}

// ===== NOVA SEÇÃO: Função para Buscar Atividades =====

/**
 * Função para buscar atividades de uma negociação específica
 * @param {string} token - Token do RD Station
 * @param {string} dealId - ID da negociação
 */
function buscarAtividadesNegociacao(token, dealId) {
  const apiUrl = `https://crm.rdstation.com/api/v1/activities?token=${token}&deal_id=${dealId}`;
  const headers = {
    "accept": "application/json"
  };

  chrome.runtime.sendMessage(
    {
      action: 'fetchActivities', // Nova ação para buscar atividades
      url: apiUrl,
      headers: headers
    },
    (response) => {
      if (response && response.success) { // Safe check
        const activitiesData = response.data;
        console.log(`Atividades da Negociação (${dealId}):`, activitiesData);

        // Armazena as atividades globalmente, se necessário
        window.deal_activities = activitiesData.activities || [];

        // Seleciona o container da seção 'atividades'
        const atividadesContainer = document.getElementById('anotacoes-container');
        if (atividadesContainer) {
          // Limpa o conteúdo anterior
          atividadesContainer.innerHTML = '';

          if (activitiesData.total > 0 && window.deal_activities.length > 0) {
            // Exibe cada atividade
            window.deal_activities.forEach((activity, index) => {
              const activityDiv = document.createElement('div');
              activityDiv.classList.add('div-item'); // Adicionado

              const activityTitle = document.createElement('h3');
              activityTitle.classList.add('div-title'); // Adicionado
              activityTitle.innerText = `Anotações ${index + 1}`;
              activityDiv.appendChild(activityTitle);

              const activityDetails = document.createElement('p');
              activityDetails.classList.add('activity-details'); // Adiciona a classe para estilização
              activityDetails.innerHTML = `
                <strong>ID da Anotação:</strong> ${activity.id || 'N/A'}<br>
                <strong>Tipo:</strong> ${activity.type || 'N/A'}<br>
                <strong>Descrição:</strong> ${activity.description || 'N/A'}<br>
                <strong>Data:</strong> ${activity.date || 'N/A'}<br>
              `;
              activityDiv.appendChild(activityDetails);

              atividadesContainer.appendChild(activityDiv);
            });
          } else {
            const p = document.createElement('p');
            p.innerText = 'Nenhuma anotação encontrada para este negócio.';
            p.classList.add('div-item', 'div-title'); // Adicionado
            atividadesContainer.appendChild(p);
          }
        } else {
          console.error("O container 'atividades-content' não foi encontrado.");
        }
      } else {
        console.error(`Erro ao buscar atividades da Negociação (${dealId}):`, response ? response.error : 'No response');
      }
    }
  );
}

// ===== SEÇÃO 3: Criação de Seções Expansíveis =====

/**
 * Função para criar uma seção expansível na interface
 * @param {string} buttonText - Texto do botão que expande/contrai
 * @param {Function} contentGenerator - Função que gera o conteúdo da seção
 * @param {string} sectionId - ID único para a seção
 */
function criarSecaoExpansivel(buttonText, contentGenerator, sectionId) {
  const expandableContainer = document.createElement('div');
  expandableContainer.className = 'expandable-container';
  expandableContainer.id = `${sectionId}-container`;

  const toggleButton = document.createElement('button');
  toggleButton.innerText = buttonText;
  toggleButton.className = 'toggle-buttonn';
  toggleButton.id = `${sectionId}-button`;

  const content = contentGenerator();
  content.style.margin = '0';
  content.id = `${sectionId}-content`; // Assegura que o ID está definido

  expandableContainer.appendChild(content);

  // Evento para alternar a classe 'expanded' ao clicar no botão
  toggleButton.addEventListener('click', () => {
    expandableContainer.classList.toggle('expanded');
  });

  // Adiciona o botão e o container ao contêiner personalizado
  const customContainer = document.getElementById('custom-container');
  if (customContainer) {
    customContainer.appendChild(toggleButton);
    customContainer.appendChild(expandableContainer);
  } else {
    console.error("'custom-container' não encontrado ao criar seção expansível.");
  }
}

// ===== SEÇÃO 4: Adicionando o Botão de Toggle do CRM =====

/**
 * Função para adicionar o botão de toggle do CRM na interface
 */
function adicionarBotaoAlternar() { 
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
  botaoToggle.className = 'q-btn q-btn-item non-selectable no-outline btn-rounded toggle-button q-btn--flat q-btn--round text-white q-btn--actionable q-focusable q-hoverable q-btn--wrap'; 
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
    // Removido: customContainer.style.display = customContainer.classList.contains('visible') ? 'block' : 'none';
  }); 

  // Definindo a cor inicial do botão com base no modo atual
  atualizarCorBotaoAlternar();

  // Verifica o modo a cada 0.05 segundos e atualiza a cor do botão
  setInterval(atualizarCorBotaoAlternar, 50);
}

/**
 * Função para verificar o modo atual e atualizar a cor do botão de toggle
 */
function atualizarCorBotaoAlternar() {
  const divModo = document.querySelector('div.q-scrollarea');
  if (!divModo) {
    console.error('Div alvo para detecção de modo não encontrada.');
    return;
  }

  const isDark = divModo.classList.contains('q-scrollarea--dark');
  const botaoToggle = document.getElementById('botao-toggle-crm');
  const customContainer = document.getElementById('custom-container');

  if (!botaoToggle) {
    console.error('Botão toggle não encontrado.');
    return;
  }

  if (isDark) {
    // Modo Escuro
    botaoToggle.style.backgroundColor = '#444444'; // Cor no modo escuro
    botaoToggle.querySelector('.q-icon').style.color = '#ffffff';

    // Adiciona a classe 'modo-escuro' ao custom-container
    if (customContainer) {
      customContainer.classList.add('modo-escuro');
    }
  } else {
    // Modo Claro
    botaoToggle.style.backgroundColor = 'rgb(5,78,142)'; // Cor no modo claro
    botaoToggle.querySelector('.q-icon').style.color = '#ffffff';

    // Remove a classe 'modo-escuro' do custom-container
    if (customContainer) {
      customContainer.classList.remove('modo-escuro');
    }
  }
}
// Adiciona o botão de toggle ao carregar o DOM
document.addEventListener('DOMContentLoaded', adicionarBotaoAlternar);

// ===== SEÇÃO 5: Observador de Mutação no DOM =====

// Observador para detectar mudanças no DOM e adicionar o botão de toggle se necessário
const observadorDOM = new MutationObserver((mutations, obs) => {
  const divAlvo = document.querySelector('div.q-gutter-sm.row.items-center.no-wrap');
  if (divAlvo && !document.getElementById('botao-toggle-crm')) {
    adicionarBotaoAlternar();
  }
});
observadorDOM.observe(document, { childList: true, subtree: true });

// ===== SEÇÃO 6: Definição das Seções Personalizadas =====

// Lista de seções com seus respectivos IDs, labels e geradores de conteúdo
const listaSecoes = [
  { 
    id: 'empresas', 
    label: 'Empresas', 
    content: () => { 
      // Adaptado para incluir o container de organizações dentro de Empresas
      const container = document.createElement('div');
      container.id = 'empresas-content'; // Define o ID para compatibilidade com buscarOrganizacoes
      container.innerText = 'Carregando organizações...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'negociacoes', 
    label: 'Negociação', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'negociacoes-container'; // Define o ID para compatibilidade com a extração de markup e nome da organização
      container.innerText = 'Carregando negociações...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'produto_negociacoes', 
    label: 'Produto das negociações', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'produto_negociacoes-content'; // Define o ID para compatibilidade com buscarProdutosNegociacao
      container.innerText = 'Carregando produtos...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'produtos', 
    label: 'Produtos', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'produtos-container'; // Define o ID para compatibilidade com buscarProdutos
      container.innerText = 'Carregando produtos...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'etapas_funil_vendas', 
    label: 'Etapas do funil de vendas', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'etapas_funil_vendas-container'; // Define o ID para compatibilidade com buscarEtapasFunilVendas
      container.innerText = 'Carregando etapas do funil de vendas...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'tarefas', 
    label: 'Tarefas', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'tarefas-content'; // Define o ID para compatibilidade com buscarTarefasNegociacao
      container.innerText = 'Carregando tarefas...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'anotacoes', 
    label: 'Anotações', 
    content: () => { 
      const p = document.createElement('p'); 
      p.innerText = 'Conteúdo exclusivo para Anotações.'; 
      p.classList.add('div-item'); // Adicionado para consistência
      return p; 
    } 
  },
  { 
    id: 'fontes', 
    label: 'Fontes', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'fontes-content'; // Define o ID para compatibilidade com a extração do nome do deal_source
      container.innerText = 'Carregando fontes...'; // Texto de carregamento inicial
      return container; 
    } 
  },
  { 
    id: 'campanhas', // Atualizado para criar um container adequado
    label: 'Campanhas', 
    content: () => { 
      const container = document.createElement('div');
      container.id = 'campanhas-content'; // Define o ID para compatibilidade com a extração de campaign name
      container.innerText = 'Carregando campanhas...'; // Texto de carregamento inicial
      return container; 
    } 
  }
];

/**
 * Função para injetar uma seção personalizada na interface
 * @param {Object} section - Objeto representando a seção
 * @param {Function} contentGenerator - Função que gera o conteúdo da seção
 */
function injetarSecao(section, contentGenerator) {
  criarSecaoExpansivel(section.label, contentGenerator, section.id);
}

/**
 * Função para injetar múltiplas seções com base nas configurações
 * @param {Object} settings - Configurações de ativação das seções
 */
function injetarSecoes(settings) {
  listaSecoes.forEach(section => {
    if (settings[section.id]) {
      injetarSecao(section, section.content);

      // Se a seção for 'produtos', chama a função para buscar produtos
      if (section.id === 'produtos') {
        chrome.storage.local.get(['tokenrdsarion'], (result) => {
          let tokenrdsarion = result.tokenrdsarion;
          if (!tokenrdsarion) {
            console.error("tokenrdsarion não encontrado no chrome.storage.local para buscar produtos.");
            const produtosContainer = document.getElementById('produtos-container');
            if (produtosContainer) {
              produtosContainer.innerText = 'Erro: Token não encontrado.';
            }
            return;
          }
          buscarProdutos(tokenrdsarion);
        });
      }
    }
  });
}

/**
 * Função para adicionar um parágrafo a uma seção específica
 * @param {string} sectionId - ID da seção
 * @param {string} text - Texto do parágrafo
 */
function adicionarParagrafoNaSecao(sectionId, text) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    const p = document.createElement('p');
    p.innerText = text;
    p.classList.add('div-item'); // Adicionado para consistência
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
function adicionarElementoNaSecao(sectionId, element) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    contentContainer.appendChild(element);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

// ===== SEÇÃO 7: Função Principal para Operações de API =====

/**
 * Função principal que realiza operações de API e atualiza a interface
 */
function executarFuncaoPrincipal() {
  let token = window.localStorage.getItem('token');
  console.log("Token original:", token);

  if (!token) {
    console.error("Token não encontrado no localStorage da página.");
    return;
  }

  // Remove aspas do token
  token = token.replace(/["']/g, '');
  console.log("Token sem aspas:", token);

  // Armazena o token processado no chrome.storage.local com uma chave distinta
  chrome.storage.local.set({ tokenContent: token }, () => {
    console.log('TokenContent salvo no chrome.storage.local:', token);
  });
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


// ===== SEÇÃO 8: Observador de Mudança de URL =====

/**
 * Função para observar mudanças na URL e executar ações quando a URL muda
 */
function monitorarAlteracoesURL() {
  let urlAnterior = window.location.href;

  setInterval(() => {
    const urlAtual = window.location.href;
    if (urlAnterior !== urlAtual) {
      console.log("A URL mudou. Nova URL:", urlAtual);
      executarFuncaoPrincipal(); // Executa a função principal novamente
      urlAnterior = urlAtual;

      // Verifica se a seção 'produtos' está ativa e, se estiver, busca os produtos novamente
      chrome.storage.local.get(['sectionSettings'], (result) => {
        const settings = result.sectionSettings;
        if (settings && settings['produtos']) {
          chrome.storage.local.get(['tokenrdsarion'], (res) => {
            let tokenrdsarion = res.tokenrdsarion;
            if (tokenrdsarion && window.numerodetell) {
              tratarMudancaNumeroTelefone(window.numerodetell);
            } else {
              console.error("Não foi possível atualizar os produtos devido a falta de token ou numerodetell.");
            }
          });
        }
      });
    }
  }, 1000); // Verifica a cada segundo
}

// ===== SEÇÃO 9: Inicialização do Conteúdo Personalizado =====

/**
 * Função para inicializar o conteúdo personalizado com base nas configurações
 * e chamar callback após a injeção das seções
 * @param {Function} callback - Função a ser chamada após a injeção das seções
 */
function inicializarConteudo(callback) {
  chrome.storage.local.get(['sectionSettings'], (result) => {
    let settings = result.sectionSettings;
    if (!settings) {
      // Define todas as seções como ativas por padrão
      settings = {};
      listaSecoes.forEach(section => {
        settings[section.id] = true;
      });
      chrome.storage.local.set({ sectionSettings: settings });
    }
    injetarSecoes(settings); // Injeta as seções conforme as configurações
    if (callback) callback(); // Chama a função de callback após a injeção das seções
  });
}

/**
 * Função para adicionar um parágrafo a uma seção específica
 * @param {string} sectionId - ID da seção
 * @param {string} text - Texto do parágrafo
 */
function adicionarParagrafoNaSecao(sectionId, text) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    const p = document.createElement('p');
    p.innerText = text;
    p.classList.add('div-item'); // Adicionado para consistência
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
function adicionarElementoNaSecao(sectionId, element) {
  const contentContainer = document.getElementById(`${sectionId}-content`);
  if (contentContainer) {
    contentContainer.appendChild(element);
  } else {
    console.error(`Seção com ID ${sectionId} não encontrada.`);
  }
}

// ===== SEÇÃO 10: Criação do Contêiner Personalizado =====

// Cria o contêiner principal personalizado
const novoElemento = document.createElement('div');
novoElemento.id = 'custom-container';
novoElemento.className = 'custom-container'; // Adiciona uma classe para estilização

// Cria o contêiner para o nome do cliente
const contêinerNomeCliente = document.createElement('div');
contêinerNomeCliente.id = 'client-name-container';

// Cria o elemento para exibir o nome do cliente
const nomeCliente = document.createElement('h2');
nomeCliente.innerText = 'Cliente:';
nomeCliente.style.color = 'white';
nomeCliente.style.textAlign = 'center';
nomeCliente.id = 'clientName';
nomeCliente.classList.add('div-title'); // Adicionado

contêinerNomeCliente.appendChild(nomeCliente);
novoElemento.appendChild(contêinerNomeCliente);

// Cria o título do CRM
const tituloCRM = document.createElement('h1');
tituloCRM.innerText = 'CRM';
tituloCRM.id = 'titulo-crm';
tituloCRM.style.color = 'white'; // Ajusta a cor para melhor visibilidade
tituloCRM.classList.add('div-title'); // Adicionado

novoElemento.appendChild(tituloCRM);

// Adiciona uma linha horizontal
const linhaHorizontal = document.createElement('hr');
novoElemento.appendChild(linhaHorizontal);

// Adiciona o contêiner personalizado ao corpo do documento
document.body.appendChild(novoElemento);

// ===== SEÇÃO 11: Inicialização e Execução das Funções Principais =====

// Observa mudanças na URL
monitorarAlteracoesURL();

// Inicializa o conteúdo personalizado e, após a injeção, executa executarFuncaoPrincipal
inicializarConteudo(executarFuncaoPrincipal);

// ===== SEÇÃO 12: Listener para Mudanças no Chrome Storage =====

// Listener para detectar mudanças no armazenamento local do Chrome
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    // Verifica se houve mudanças nas configurações das seções
    if (changes.sectionSettings) {
      const newSettings = changes.sectionSettings.newValue;
      // Remove seções existentes e injeta novas com base nas configurações atualizadas
      listaSecoes.forEach(section => {
        const container = document.getElementById(`${section.id}-container`);
        if (container) {
          container.parentNode.removeChild(container);
        }
        const button = document.getElementById(`${section.id}-button`);
        if (button) {
          button.parentNode.removeChild(button);
        }
      });
      injetarSecoes(newSettings);
    }

    // Verifica se houve mudanças no 'tokenrdsarion'
    if (changes.tokenrdsarion) {
      console.log("tokenrdsarion foi atualizado.");
      tratarMudancaNumeroTelefone(window.numerodetell); // Reexecuta a função para atualizar dados
    }
  }
});

// Listener para mensagens do background script ou popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSections') {
    // Rebusca as configurações de seção e atualiza a interface
    chrome.storage.local.get(['sectionSettings'], (result) => {
      const newSettings = result.sectionSettings;
      // Remove seções existentes e injeta novas com base nas configurações atualizadas
      listaSecoes.forEach(section => {
        const container = document.getElementById(`${section.id}-container`);
        if (container) {
          container.parentNode.removeChild(container);
        }
        const button = document.getElementById(`${section.id}-button`);
        if (button) {
          button.parentNode.removeChild(button);
        }
      });
      injetarSecoes(newSettings);
    });
  }
});


// ===== SEÇÃO 13: Listener para Cliques nos Divs de Tickets =====

/**
 * Listener para detectar cliques nos divs de tickets
 * e tornar o custom-container visível
 */
document.addEventListener('click', function(e) {
  // Verifica se o alvo do clique ou algum de seus ancestrais possui a classe 'ticketBorder'
  if (e.target.closest('.ticketBorder')) {
    const customContainer = document.getElementById('custom-container');
    if (customContainer) {
      customContainer.classList.add('visible'); // Adiciona a classe 'visible'
      // Removido: customContainer.style.display = 'block'; // Garante que o contêiner esteja visível
      console.log("'visible' class adicionada ao custom-container devido ao clique em um ticket.");
    } else {
      console.error("'custom-container' não encontrado.");
    }
  }
});


