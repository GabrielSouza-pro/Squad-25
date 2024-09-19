// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  // Torna o body um contêiner flexível
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'row'; // Garante que os elementos fiquem lado a lado (horizontalmente)

  // Cria a nova aba lateral
  const newElement = document.createElement('div');
  newElement.style.height = '100vh'; // Faz com que o elemento ocupe toda a altura da página
  newElement.style.width = '500px'; // Define a largura da aba lateral
  newElement.style.backgroundColor = 'rgb(30, 30, 30)'; // Cor de fundo
  newElement.style.padding = '1px';
  newElement.style.boxSizing = 'border-box'; // Garante que o padding seja incluído na largura total
  newElement.style.border = '3px solid rgb(10, 15, 18)'; // Borda de 3px com a cor RGB
  newElement.style.borderRadius = '12px';

  // Cria o contêiner para o nome do cliente
  const clientNameContainer = document.createElement('div');
  clientNameContainer.style.width = '100%'; // Define a largura como 100%
  clientNameContainer.style.marginBottom = '20px'; // Espaçamento abaixo do contêiner
  clientNameContainer.style.padding = '10px';
  clientNameContainer.style.backgroundColor = '#63636370'; // Cor de fundo com transparência
  clientNameContainer.style.borderTopLeftRadius = '10px'; // Arredonda a borda superior esquerda
  clientNameContainer.style.borderTopRightRadius = '10px'; // Arredonda a borda superior direita

  // Adiciona o nome do cliente ao contêiner
  const clientName = document.createElement('h2');
  clientName.innerText = 'Cliente:'; // Substitua pelo nome real do cliente
  clientName.style.color = 'white'; // Cor do texto
  clientName.style.textAlign = 'center'; // Alinha o texto ao centro
  clientName.id = 'clientName'; // Adiciona um ID para facilitar a seleção

  clientNameContainer.appendChild(clientName);

  // Adiciona o contêiner do nome do cliente acima do título CRM
  newElement.appendChild(clientNameContainer);

  // Cria e adiciona o título CRM dentro da aba lateral
  const titulocrm = document.createElement('h1');
  titulocrm.innerText = 'CRM';

  // Estiliza o título diretamente no JavaScript
  titulocrm.style.textAlign = 'center';
  titulocrm.style.fontFamily = "'Noto Sans', sans-serif";
  titulocrm.style.fontStyle = 'normal';
  titulocrm.style.fontWeight = '400';
  titulocrm.style.fontSize = '40px';
  titulocrm.style.lineHeight = '54px';
  titulocrm.style.padding = '5px';
  titulocrm.style.background = 'radial-gradient(50% 50% at 50% 50%, #59ff10 0%, #64fe6d 36.94%, #67fd88 55.15%, #6afd9d 70.2%, #70fcd0 95.5%)';
  titulocrm.style.webkitBackgroundClip = 'text';
  titulocrm.style.backgroundClip = 'text';
  titulocrm.style.webkitTextFillColor = 'transparent';

  newElement.appendChild(titulocrm);

  // Cria e estiliza a linha horizontal
  const hr = document.createElement('hr');
  hr.style.border = 'none'; // Remove a borda padrão
  hr.style.borderTop = '2px solid rgb(200, 200, 200)'; // Define a borda superior como uma linha sólida cinza claro
  hr.style.margin = '0 0 20px 0'; // Remove as margens acima e abaixo da linha

  // Adiciona a linha horizontal à aba lateral
  newElement.appendChild(hr);

  // Cria o contêiner expansível
  const expandableContainer = document.createElement('div');
  expandableContainer.style.overflow = 'hidden'; // Garante que o conteúdo oculto não seja exibido
  expandableContainer.style.maxHeight = '0'; // Inicialmente oculto
  expandableContainer.style.opacity = '0'; // Inicialmente oculto
  expandableContainer.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out'; // Adiciona uma transição suave
  expandableContainer.style.backgroundColor = 'rgb(40, 40, 40)'; // Cor de fundo do contêiner expansível
  expandableContainer.style.padding = '10px'; // Adiciona algum padding para o conteúdo
  expandableContainer.style.boxSizing = 'border-box'; // Garante que o padding seja incluído na largura total

  // Cria o botão para expandir/contrair o contêiner
  const toggleButton = document.createElement('button');
  toggleButton.innerText = 'Empresas';
  toggleButton.style.marginBottom = '10px'; // Adiciona margem inferior para separar o botão do conteúdo
  toggleButton.style.width = '100%';
  toggleButton.style.padding = '10px';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.backgroundColor = '#63636370';
  toggleButton.style.color = 'white';
  toggleButton.style.fontSize = '16px';
  toggleButton.style.cursor = 'pointer';

  // Adiciona o botão ao contêiner
  newElement.appendChild(toggleButton);

  // Cria o conteúdo do contêiner
  const content = document.createElement('p');
  content.innerText = 'Este é o conteúdo expandido que pode ser mostrado ou ocultado.';
  content.style.margin = '0'; // Remove margens padrão

  // Adiciona o conteúdo ao contêiner
  expandableContainer.appendChild(content);

  // Adiciona o contêiner à aba lateral
  newElement.appendChild(expandableContainer);

  // Configura o botão para expandir/contrair o contêiner
  let isExpanded = false;
  toggleButton.addEventListener('click', () => {
    if (isExpanded) {
      expandableContainer.style.maxHeight = '0';
      expandableContainer.style.opacity = '0';
    } else {
      expandableContainer.style.maxHeight = '200px'; // Ajuste o valor conforme necessário
      expandableContainer.style.opacity = '1';
    }
    isExpanded = !isExpanded;
  });

  // Cria e adiciona o conteúdo adicional à aba lateral

  // Adiciona a aba lateral ao body
  document.body.appendChild(newElement);
})();

function minhaFuncao() {
  const divElement = document.querySelector('.q-item__label.text-bold');
  if (divElement) {
    let content = divElement.textContent.trim();
    console.log("Texto original: " + content);

    // Filtra o texto conforme solicitado
    content = content.replace(/.{2}\/.*/, ''); // Remove os dois caracteres anteriores à barra e tudo depois dela

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
   console.log('Elemento divElement não encontrado');
 }
}
setTimeout(minhaFuncao, 3000);
