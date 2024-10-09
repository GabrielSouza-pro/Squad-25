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
  toggleButton2.innerText = 'Negociações';
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

  // Contêiner expansível
  const expandableContainer3 = document.createElement('div');
  expandableContainer3.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton3 = document.createElement('button');
  toggleButton3.innerText = 'Produto das negociações ';
  toggleButton3.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton3);
  const content3 = document.createElement('p');
  content3.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content3.style.margin = '0';
  expandableContainer3.appendChild(content3);
  newElement.appendChild(expandableContainer3);

  let isExpanded3 = false;
  toggleButton3.addEventListener('click', () => {
    if (isExpanded3) {
      expandableContainer3.style.maxHeight = '0';
      expandableContainer3.style.opacity = '0';
    } else {
      expandableContainer3.style.maxHeight = '200px';
      expandableContainer3.style.opacity = '1';
    }
    isExpanded3 = !isExpanded3;
  });

  // Contêiner expansível
  const expandableContainer4 = document.createElement('div');
  expandableContainer4.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton4 = document.createElement('button');
  toggleButton4.innerText = 'Produtos';
  toggleButton4.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton4);
  const content4 = document.createElement('p');
  content4.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content4.style.margin = '0';
  expandableContainer4.appendChild(content4);
  newElement.appendChild(expandableContainer4);

  let isExpanded4 = false;
  toggleButton4.addEventListener('click', () => {
    if (isExpanded4) {
      expandableContainer4.style.maxHeight = '0';
      expandableContainer4.style.opacity = '0';
    } else {
      expandableContainer4.style.maxHeight = '200px';
      expandableContainer4.style.opacity = '1';
    }
    isExpanded4 = !isExpanded4;
  });

  // Contêiner expansível
  const expandableContainer5 = document.createElement('div');
  expandableContainer5.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton5 = document.createElement('button');
  toggleButton5.innerText = 'Campos personalizados ';
  toggleButton5.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton5);
  const content5 = document.createElement('p');
  content5.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content5.style.margin = '0';
  expandableContainer5.appendChild(content5);
  newElement.appendChild(expandableContainer5);

  let isExpanded5 = false;
  toggleButton5.addEventListener('click', () => {
    if (isExpanded5) {
      expandableContainer5.style.maxHeight = '0';
      expandableContainer5.style.opacity = '0';
    } else {
      expandableContainer5.style.maxHeight = '200px';
      expandableContainer5.style.opacity = '1';
    }
    isExpanded5 = !isExpanded5;
  });

  // Contêiner expansível
  const expandableContainer6 = document.createElement('div');
  expandableContainer6.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton6 = document.createElement('button');
  toggleButton6.innerText = 'Funil de vendas';
  toggleButton6.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton6);
  const content6 = document.createElement('p');
  content6.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content6.style.margin = '0';
  expandableContainer6.appendChild(content6);
  newElement.appendChild(expandableContainer6);

  let isExpanded6 = false;
  toggleButton6.addEventListener('click', () => {
    if (isExpanded6) {
      expandableContainer6.style.maxHeight = '0';
      expandableContainer6.style.opacity = '0';
    } else {
      expandableContainer6.style.maxHeight = '200px';
      expandableContainer6.style.opacity = '1';
    }
    isExpanded6 = !isExpanded6;
  });
  // Contêiner expansível
  const expandableContainer7 = document.createElement('div');
  expandableContainer7.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton7 = document.createElement('button');
  toggleButton7.innerText = 'Etapas do funil de vendas';
  toggleButton7.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton7);
  const content7 = document.createElement('p');
  content7.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content7.style.margin = '0';
  expandableContainer7.appendChild(content7);
  newElement.appendChild(expandableContainer7);

  let isExpanded7 = false;
  toggleButton7.addEventListener('click', () => {
    if (isExpanded7) {
      expandableContainer7.style.maxHeight = '0';
      expandableContainer7.style.opacity = '0';
    } else {
      expandableContainer7.style.maxHeight = '200px';
      expandableContainer7.style.opacity = '1';
    }
    isExpanded7 = !isExpanded7;
  });
  // Contêiner expansível
  const expandableContainer8 = document.createElement('div');
  expandableContainer8.className = 'expandable-container';

  // Botão para expandir/contrair
  const toggleButton8 = document.createElement('button');
  toggleButton8.innerText = 'Tarefas';
  toggleButton8.className = 'toggle-buttonn'; 

  newElement.appendChild(toggleButton8);
  const content8 = document.createElement('p');
  content8.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content8.style.margin = '0';
  expandableContainer8.appendChild(content8);
  newElement.appendChild(expandableContainer8);

  let isExpanded8 = false;
  toggleButton8.addEventListener('click', () => {
    if (isExpanded8) {
      expandableContainer8.style.maxHeight = '0';
      expandableContainer8.style.opacity = '0';
    } else {
      expandableContainer8.style.maxHeight = '200px';
      expandableContainer8.style.opacity = '1';
    }
    isExpanded8 = !isExpanded8;
  });

// Contêiner expansível
const expandableContainer9 = document.createElement('div');
expandableContainer9.className = 'expandable-container';

// Botão para expandir/contrair
const toggleButton9 = document.createElement('button');
toggleButton9.innerText = 'Anotações';
toggleButton9.className = 'toggle-buttonn'; 

newElement.appendChild(toggleButton9);
const content9 = document.createElement('p');
content9.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
content9.style.margin = '0';
expandableContainer9.appendChild(content9);
newElement.appendChild(expandableContainer9);

let isExpanded9 = false;
toggleButton9.addEventListener('click', () => {
  if (isExpanded9) {
    expandableContainer9.style.maxHeight = '0';
    expandableContainer9.style.opacity = '0';
  } else {
    expandableContainer9.style.maxHeight = '200px';
    expandableContainer9.style.opacity = '1';
  }
  isExpanded9 = !isExpanded9;
});

// Contêiner expansível
const expandableContainer10 = document.createElement('div');
expandableContainer10.className = 'expandable-container';

// Botão para expandir/contrair
const toggleButton10 = document.createElement('button');
toggleButton10.innerText = 'Fontes';
toggleButton10.className = 'toggle-buttonn'; 

newElement.appendChild(toggleButton10);
const content10 = document.createElement('p');
content10.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
content10.style.margin = '0';
expandableContainer10.appendChild(content10);
newElement.appendChild(expandableContainer10);

let isExpanded10 = false;
toggleButton10.addEventListener('click', () => {
  if (isExpanded10) {
    expandableContainer10.style.maxHeight = '0';
    expandableContainer10.style.opacity = '0';
  } else {
    expandableContainer10.style.maxHeight = '200px';
    expandableContainer10.style.opacity = '1';
  }
  isExpanded10 = !isExpanded10;
});

// Contêiner expansível
const expandableContainer11 = document.createElement('div');
expandableContainer11.className = 'expandable-container';

// Botão para expandir/contrair
const toggleButton11 = document.createElement('button');
toggleButton11.innerText = 'Campanhas';
toggleButton11.className = 'toggle-buttonn'; 

newElement.appendChild(toggleButton11);
const content11 = document.createElement('p');
content11.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
content11.style.margin = '0';
expandableContainer11.appendChild(content11);
newElement.appendChild(expandableContainer11);

let isExpanded11 = false;
toggleButton11.addEventListener('click', () => {
  if (isExpanded11) {
    expandableContainer11.style.maxHeight = '0';
    expandableContainer11.style.opacity = '0';
  } else {
    expandableContainer11.style.maxHeight = '200px';
    expandableContainer11.style.opacity = '1';
  }
  isExpanded11 = !isExpanded11;
});

// Contêiner expansível
const expandableContainer12 = document.createElement('div');
expandableContainer12.className = 'expandable-container';

// Botão para expandir/contrair
const toggleButton12 = document.createElement('button');
toggleButton12.innerText = 'Motivo da perda';
toggleButton12.className = 'toggle-buttonn'; 

newElement.appendChild(toggleButton12);
const content12 = document.createElement('p');
content12.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
content12.style.margin = '0';
expandableContainer12.appendChild(content12);
newElement.appendChild(expandableContainer12);

let isExpanded12 = false;
toggleButton12.addEventListener('click', () => {
  if (isExpanded12) {
    expandableContainer12.style.maxHeight = '0';
    expandableContainer12.style.opacity = '0';
  } else {
    expandableContainer12.style.maxHeight = '200px';
    expandableContainer12.style.opacity = '1';
  }
  isExpanded12 = !isExpanded12;
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
