// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  // Cria a nova aba lateral
  const newElement = document.createElement('div');
  newElement.id = 'custom-container';  

  // Cria o contêiner para o nome do cliente
  const clientNameContainer = document.createElement('div');
  clientNameContainer.id = 'client-name-container';

  // Adiciona o nome do cliente ao contêiner
  const clientName = document.createElement('h2');
  clientName.innerText = 'Cliente:';
  clientName.style.color = 'white';
  clientName.style.textAlign = 'center';
  clientName.id = 'clientName';

  clientNameContainer.appendChild(clientName);
  newElement.appendChild(clientNameContainer);

  // Cria e adiciona o título CRM
  const titulocrm = document.createElement('h1');
  titulocrm.innerText = 'CRM';
  titulocrm.id = 'titulo-crm';

  newElement.appendChild(titulocrm);

  // Linha horizontal
  const hr = document.createElement('hr');
  newElement.appendChild(hr);

  // Contêiner expansível
  const expandableContainer = document.createElement('div');
  expandableContainer.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton = document.createElement('button');
  toggleButton.innerText = 'Empresas';
  toggleButton.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton);
  const content = document.createElement('p');
  content.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content.style.margin = '0';
  expandableContainer.appendChild(content);
  newElement.appendChild(expandableContainer);

  let isExpanded = false;
  toggleButton.addEventListener('click', () => {
    if (isExpanded) {
      expandableContainer.style.maxHeight = '0';
      expandableContainer.style.opacity = '0';
    } else {
      expandableContainer.style.maxHeight = '200px';
      expandableContainer.style.opacity = '1';
    }
    isExpanded = !isExpanded;
  });

  // Contêiner expansível
  const expandableContainer2 = document.createElement('div');
  expandableContainer2.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton2 = document.createElement('button');
  toggleButton2.innerText = 'Empresas';
  toggleButton2.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton2);
  const content2 = document.createElement('p');
  content2.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content2.style.margin = '0';
  expandableContainer2.appendChild(content2);
  newElement.appendChild(expandableContainer2);

  let isExpanded2 = false;
  toggleButton2.addEventListener('click', () => {
    if (isExpanded2) {
      expandableContainer2.style.maxHeight = '0';
      expandableContainer2.style.opacity = '0';
    } else {
      expandableContainer2.style.maxHeight = '200px';
      expandableContainer2.style.opacity = '1';
    }
    isExpanded2 = !isExpanded2;
  });



  
  
  document.body.appendChild(newElement);
  




  function minhaFuncao() {
    // Obtém o token do localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    
    // Verifica se o token está disponível
    if (!token) {
        console.error("Token não encontrado no localStorage.");
        return; // Interrompe a função se o token não estiver presente
    }
  
    // Faz a requisição para a API
    fetch("https://chatapi.jetsalesbrasil.com/tickets/897562?id=897562", {
        headers: {
            "accept": "application/json, text/plain,/",
            "authorization": `Bearer ${token}` // Usa o token do localStorage
        },
        body:null,
        method: "GET"
    })
    .then(response => {
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Acesse o campo 'name' do ticket
        if (data.tickets && data.tickets.length > 0) {
            const content = data.tickets[0].name; // Obtém o nome do cliente
            console.log("Texto original: " + content);
  
            // Atualiza o texto do clientName
            const clientName = document.getElementById('clientName');
            if (clientName) {
                clientName.innerText = `Cliente: ${content}`;
                console.log("Texto atualizado para: " + content); // Log de sucesso
            } else {
                console.log('Elemento clientName não encontrado');
            }
        } else {
            console.error("Nenhum ticket encontrado na resposta.");
        }
    })
    .catch(error => {
        console.error('Houve um problema com a operação fetch:', error);
    });
  }
  
  // Chama a função após 4 segundos (4000 milissegundos) após o carregamento do site
  setTimeout(minhaFuncao, 4000);
  
  minhaFuncao();
})();