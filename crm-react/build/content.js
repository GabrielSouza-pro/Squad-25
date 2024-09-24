// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  // Torna o body um contêiner flexível
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'row';

  // Cria a nova aba lateral
  const newElement = document.createElement('div');
  newElement.style.height = '100vh';
  newElement.style.width = '500px';
  newElement.style.backgroundColor = 'rgb(30, 30, 30)';
  newElement.style.padding = '1px';
  newElement.style.boxSizing = 'border-box';
  newElement.style.border = '3px solid rgb(10, 15, 18)';
  newElement.style.borderRadius = '12px';

  // Cria o contêiner para o nome do cliente
  const clientNameContainer = document.createElement('div');
  clientNameContainer.style.width = '100%';
  clientNameContainer.style.marginBottom = '20px';
  clientNameContainer.style.padding = '10px';
  clientNameContainer.style.backgroundColor = '#63636370';
  clientNameContainer.style.borderTopLeftRadius = '10px';
  clientNameContainer.style.borderTopRightRadius = '10px';

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
  titulocrm.style.textAlign = 'center';
  titulocrm.style.fontFamily = "'Noto Sans', sans-serif";
  titulocrm.style.fontWeight = '400';
  titulocrm.style.fontSize = '40px';
  titulocrm.style.lineHeight = '54px';
  titulocrm.style.padding = '5px';
  titulocrm.style.background = 'radial-gradient(50% 50% at 50% 50%, #59ff10 0%, #64fe6d 36.94%, #67fd88 55.15%, #6afd9d 70.2%, #70fcd0 95.5%)';
  titulocrm.style.webkitBackgroundClip = 'text';
  titulocrm.style.backgroundClip = 'text';
  titulocrm.style.webkitTextFillColor = 'transparent';

  newElement.appendChild(titulocrm);

  // Linha horizontal
  const hr = document.createElement('hr');
  hr.style.border = 'none';
  hr.style.borderTop = '2px solid rgb(200, 200, 200)';
  hr.style.margin = '0 0 20px 0';
  newElement.appendChild(hr);

  // Contêiner expansível
  const expandableContainer = document.createElement('div');
  expandableContainer.style.overflow = 'hidden';
  expandableContainer.style.maxHeight = '0';
  expandableContainer.style.opacity = '0';
  expandableContainer.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
  expandableContainer.style.backgroundColor = 'rgb(40, 40, 40)';
  expandableContainer.style.padding = '10px';
  expandableContainer.style.boxSizing = 'border-box';

  // Botão para expandir/contrair
  const toggleButton = document.createElement('button');
  toggleButton.innerText = 'Empresas';
  toggleButton.style.marginBottom = '10px';
  toggleButton.style.width = '100%';
  toggleButton.style.padding = '10px';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.backgroundColor = '#63636370';
  toggleButton.style.color = 'white';
  toggleButton.style.fontSize = '16px';
  toggleButton.style.cursor = 'pointer';

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
    expandableContainer2.style.overflow = 'hidden';
    expandableContainer2.style.maxHeight = '0';
    expandableContainer2.style.opacity = '0';
    expandableContainer2.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer2.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer2.style.padding = '10px';
    expandableContainer2.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton2 = document.createElement('button');
    toggleButton2.innerText = 'Negociações';
    toggleButton2.style.marginBottom = '10px';
    toggleButton2.style.width = '100%';
    toggleButton2.style.padding = '10px';
    toggleButton2.style.border = 'none';
    toggleButton2.style.borderRadius = '5px';
    toggleButton2.style.backgroundColor = '#63636370';
    toggleButton2.style.color = 'white';
    toggleButton2.style.fontSize = '16px';
    toggleButton2.style.cursor = 'pointer';
  
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
  
  // Variável para armazenar o último valor
  let lastContent = '';

  // Função que será chamada periodicamente
  function minhaFuncao() {
    const divElement = document.querySelector('.q-item__label.text-bold');
    if (divElement) {
      let content = divElement.textContent.trim();
      console.log("Texto original: " + content);

      // Filtra o texto 
      content = content.replace(/.{2}\/.*/, ''); // Remove os dois caracteres anteriores à barra e tudo depois dela

      // Verifica se o conteúdo mudou
      if (content !== lastContent) {
        lastContent = content; // Atualiza o último conteúdo
        console.log("Texto filtrado: " + content);

        // Atualiza o texto do clientName
        const clientName = document.getElementById('clientName');
        if (clientName) {
          clientName.innerText = `Cliente: ${content}`;
          console.log("Texto atualizado para: " + content); // Log de sucesso
        } else {
          console.log('Elemento clientName não encontrado');
        }
      } else {
        console.log("Nenhuma mudança detectada no texto.");
      }
    } else {
      console.log('Elemento divElement não encontrado');
    }
  }

  // Executa a função a cada 1 segundo
  setInterval(minhaFuncao, 1000);

  // Chama a função imediatamente ao iniciar
  minhaFuncao();
})();
