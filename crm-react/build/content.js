// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  const newElement = document.createElement('div');
  newElement.innerText = 'Olá, esta é uma injeção de JavaScript!';
  newElement.style.position = 'fixed';
  newElement.style.bottom = '10px';
  newElement.style.right = '10px';
  newElement.style.backgroundColor = 'lightblue';
  newElement.style.padding = '10px';
  newElement.style.zIndex = '9999';
  document.body.appendChild(newElement);
})();
// Seleciona a div pelo seletor de classe
const divElement = document.querySelector('.q-item__label.text-bold');

// Verifica se o elemento foi encontrado
if (divElement) {
    // Pega o texto dentro da div
    const content = divElement.textContent.trim();
    console.log(content); // Exibe o conteúdo no console
    alert("Funcionou: " + content); // Alerta com o conteúdo
} else {
    console.log('Elemento não encontrado');
    alert("Não funcionou");
}
