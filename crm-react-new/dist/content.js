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
   




// Função para verificar o ID na URL e fazer a requisição para a API
function minhaFuncao() {
  let token = localStorage.getItem("token");
  console.log("Token original:", token);

  if (!token) {
      console.error("Token não encontrado no localStorage.");
      return;
  }

  token = token.replace(/["']/g, ''); 
  console.log("Token sem aspas:", token);

  const urlAtual = window.location.href;
  console.log("URL atual:", urlAtual);

  const regex = /\/atendimento\/(\d+)/;
  const match = urlAtual.match(regex);

  if (match && match[1]) {
      let id = match[1].replace(/\s+/g, ''); // Remove espaços do ID
      console.log("ID capturado e filtrado da URL:", id);

      const apiUrl = `https://chatapi.jetsalesbrasil.com/tickets/${id}?id=${id}`;
      console.log("URL da API que será chamada:", apiUrl);

      fetch(apiUrl, {
          headers: {
              "accept": "application/json, text/plain,/",
              "authorization": `Bearer ${token}`
          },
          body: null,
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

          if (data.contact && data.contact.pushname) {
              const content = data.contact.pushname;

              console.log("Nome do cliente: " + content);

              const clientName = document.getElementById('clientName');
              if (clientName) {
                  clientName.innerText = `Cliente: ${content}`;
                  console.log("Texto atualizado para: " + content);
              } else {
                  console.log('Elemento clientName não encontrado');
              }
          } else {
              console.error("A chave 'contact.pushname' não foi encontrada na resposta.");
          }
      })
      .catch(error => {
          console.error('Houve um problema com a operação fetch:', error);
      });
  } else {
      console.error('ID não encontrado na URL.');
  }
}

// Função para observar mudanças na URL e chamar minhaFuncao se necessário
function observarMudancaDeURL() {
  let urlAnterior = window.location.href;

  setInterval(() => {
      const urlAtual = window.location.href;

      // Verifica se a URL mudou
      if (urlAnterior !== urlAtual) {
          console.log("A URL mudou. Nova URL:", urlAtual);

          // Chama a função minhaFuncao se a URL mudou
          minhaFuncao();

          // Atualiza a URL anterior
          urlAnterior = urlAtual;
      }
  }, 1000); // Verifica a cada 1 segundo
}


// Inicia o observador de mudanças na URL
observarMudancaDeURL();


})();
