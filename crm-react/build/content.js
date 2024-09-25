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
  newElement.style.overflow = 'auto';

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

    
    // Contêiner expansível
    const expandableContainer3 = document.createElement('div');
    expandableContainer3.style.overflow = 'hidden';
    expandableContainer3.style.maxHeight = '0';
    expandableContainer3.style.opacity = '0';
    expandableContainer3.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer3.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer3.style.padding = '10px';
    expandableContainer3.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton3 = document.createElement('button');
    toggleButton3.innerText = 'Produto das negociações';
    toggleButton3.style.marginBottom = '10px';
    toggleButton3.style.width = '100%';
    toggleButton3.style.padding = '10px';
    toggleButton3.style.border = 'none';
    toggleButton3.style.borderRadius = '5px';
    toggleButton3.style.backgroundColor = '#63636370';
    toggleButton3.style.color = 'white';
    toggleButton3.style.fontSize = '16px';
    toggleButton3.style.cursor = 'pointer';
  
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
    expandableContainer4.style.overflow = 'hidden';
    expandableContainer4.style.maxHeight = '0';
    expandableContainer4.style.opacity = '0';
    expandableContainer4.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer4.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer4.style.padding = '10px';
    expandableContainer4.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton4 = document.createElement('button');
    toggleButton4.innerText = 'Produtos';
    toggleButton4.style.marginBottom = '10px';
    toggleButton4.style.width = '100%';
    toggleButton4.style.padding = '10px';
    toggleButton4.style.border = 'none';
    toggleButton4.style.borderRadius = '5px';
    toggleButton4.style.backgroundColor = '#63636370';
    toggleButton4.style.color = 'white';
    toggleButton4.style.fontSize = '16px';
    toggleButton4.style.cursor = 'pointer';
  
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
    expandableContainer5.style.overflow = 'hidden';
    expandableContainer5.style.maxHeight = '0';
    expandableContainer5.style.opacity = '0';
    expandableContainer5.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer5.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer5.style.padding = '10px';
    expandableContainer5.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton5 = document.createElement('button');
    toggleButton5.innerText = 'Campos personalizados';
    toggleButton5.style.marginBottom = '10px';
    toggleButton5.style.width = '100%';
    toggleButton5.style.padding = '10px';
    toggleButton5.style.border = 'none';
    toggleButton5.style.borderRadius = '5px';
    toggleButton5.style.backgroundColor = '#63636370';
    toggleButton5.style.color = 'white';
    toggleButton5.style.fontSize = '16px';
    toggleButton5.style.cursor = 'pointer';
  
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
    expandableContainer6.style.overflow = 'hidden';
    expandableContainer6.style.maxHeight = '0';
    expandableContainer6.style.opacity = '0';
    expandableContainer6.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer6.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer6.style.padding = '10px';
    expandableContainer6.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton6 = document.createElement('button');
    toggleButton6.innerText = 'Funil de vendas';
    toggleButton6.style.marginBottom = '10px';
    toggleButton6.style.width = '100%';
    toggleButton6.style.padding = '10px';
    toggleButton6.style.border = 'none';
    toggleButton6.style.borderRadius = '5px';
    toggleButton6.style.backgroundColor = '#63636370';
    toggleButton6.style.color = 'white';
    toggleButton6.style.fontSize = '16px';
    toggleButton6.style.cursor = 'pointer';
  
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
    expandableContainer7.style.overflow = 'hidden';
    expandableContainer7.style.maxHeight = '0';
    expandableContainer7.style.opacity = '0';
    expandableContainer7.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer7.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer7.style.padding = '10px';
    expandableContainer7.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton7 = document.createElement('button');
    toggleButton7.innerText = 'Etapas do funil de vendas';
    toggleButton7.style.marginBottom = '10px';
    toggleButton7.style.width = '100%';
    toggleButton7.style.padding = '10px';
    toggleButton7.style.border = 'none';
    toggleButton7.style.borderRadius = '5px';
    toggleButton7.style.backgroundColor = '#63636370';
    toggleButton7.style.color = 'white';
    toggleButton7.style.fontSize = '16px';
    toggleButton7.style.cursor = 'pointer';
  
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
    expandableContainer8.style.overflow = 'hidden';
    expandableContainer8.style.maxHeight = '0';
    expandableContainer8.style.opacity = '0';
    expandableContainer8.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer8.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer8.style.padding = '10px';
    expandableContainer8.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton8 = document.createElement('button');
    toggleButton8.innerText = 'Tarefas';
    toggleButton8.style.marginBottom = '10px';
    toggleButton8.style.width = '100%';
    toggleButton8.style.padding = '10px';
    toggleButton8.style.border = 'none';
    toggleButton8.style.borderRadius = '5px';
    toggleButton8.style.backgroundColor = '#63636370';
    toggleButton8.style.color = 'white';
    toggleButton8.style.fontSize = '16px';
    toggleButton8.style.cursor = 'pointer';
  
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
    expandableContainer9.style.overflow = 'hidden';
    expandableContainer9.style.maxHeight = '0';
    expandableContainer9.style.opacity = '0';
    expandableContainer9.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer9.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer9.style.padding = '10px';
    expandableContainer9.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton9 = document.createElement('button');
    toggleButton9.innerText = 'Anotações';
    toggleButton9.style.marginBottom = '10px';
    toggleButton9.style.width = '100%';
    toggleButton9.style.padding = '10px';
    toggleButton9.style.border = 'none';
    toggleButton9.style.borderRadius = '5px';
    toggleButton9.style.backgroundColor = '#63636370';
    toggleButton9.style.color = 'white';
    toggleButton9.style.fontSize = '16px';
    toggleButton9.style.cursor = 'pointer';
  
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
    expandableContainer10.style.overflow = 'hidden';
    expandableContainer10.style.maxHeight = '0';
    expandableContainer10.style.opacity = '0';
    expandableContainer10.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer10.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer10.style.padding = '10px';
    expandableContainer10.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton10 = document.createElement('button');
    toggleButton10.innerText = 'Equipes';
    toggleButton10.style.marginBottom = '10px';
    toggleButton10.style.width = '100%';
    toggleButton10.style.padding = '10px';
    toggleButton10.style.border = 'none';
    toggleButton10.style.borderRadius = '5px';
    toggleButton10.style.backgroundColor = '#63636370';
    toggleButton10.style.color = 'white';
    toggleButton10.style.fontSize = '16px';
    toggleButton10.style.cursor = 'pointer';
  
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
    expandableContainer11.style.overflow = 'hidden';
    expandableContainer11.style.maxHeight = '0';
    expandableContainer11.style.opacity = '0';
    expandableContainer11.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer11.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer11.style.padding = '10px';
    expandableContainer11.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton11 = document.createElement('button');
    toggleButton11.innerText = 'Fontes';
    toggleButton11.style.marginBottom = '10px';
    toggleButton11.style.width = '100%';
    toggleButton11.style.padding = '10px';
    toggleButton11.style.border = 'none';
    toggleButton11.style.borderRadius = '5px';
    toggleButton11.style.backgroundColor = '#63636370';
    toggleButton11.style.color = 'white';
    toggleButton11.style.fontSize = '16px';
    toggleButton11.style.cursor = 'pointer';
  
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
    expandableContainer12.style.overflow = 'hidden';
    expandableContainer12.style.maxHeight = '0';
    expandableContainer12.style.opacity = '0';
    expandableContainer12.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer12.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer12.style.padding = '10px';
    expandableContainer12.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton12 = document.createElement('button');
    toggleButton12.innerText = 'Campanhas';
    toggleButton12.style.marginBottom = '10px';
    toggleButton12.style.width = '100%';
    toggleButton12.style.padding = '10px';
    toggleButton12.style.border = 'none';
    toggleButton12.style.borderRadius = '5px';
    toggleButton12.style.backgroundColor = '#63636370';
    toggleButton12.style.color = 'white';
    toggleButton12.style.fontSize = '16px';
    toggleButton12.style.cursor = 'pointer';
  
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

    
    // Contêiner expansível
    const expandableContainer13 = document.createElement('div');
    expandableContainer13.style.overflow = 'hidden';
    expandableContainer13.style.maxHeight = '0';
    expandableContainer13.style.opacity = '0';
    expandableContainer13.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
    expandableContainer13.style.backgroundColor = 'rgb(40, 40, 40)';
    expandableContainer13.style.padding = '10px';
    expandableContainer13.style.boxSizing = 'border-box';
  
    // Botão para expandir/contrair
    const toggleButton13 = document.createElement('button');
    toggleButton13.innerText = 'Motivo da perda';
    toggleButton13.style.marginBottom = '10px';
    toggleButton13.style.width = '100%';
    toggleButton13.style.padding = '10px';
    toggleButton13.style.border = 'none';
    toggleButton13.style.borderRadius = '5px';
    toggleButton13.style.backgroundColor = '#63636370';
    toggleButton13.style.color = 'white';
    toggleButton13.style.fontSize = '16px';
    toggleButton13.style.cursor = 'pointer';
  
    newElement.appendChild(toggleButton13);
    const content13 = document.createElement('p');
    content13.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
    content13.style.margin = '0';
    expandableContainer13.appendChild(content13);
    newElement.appendChild(expandableContainer13);
  
    let isExpanded13 = false;
    toggleButton13.addEventListener('click', () => {
      if (isExpanded13) {
        expandableContainer13.style.maxHeight = '0';
        expandableContainer13.style.opacity = '0';
      } else {
        expandableContainer13.style.maxHeight = '200px';
        expandableContainer13.style.opacity = '1';
      }
      isExpanded13 = !isExpanded13;
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
