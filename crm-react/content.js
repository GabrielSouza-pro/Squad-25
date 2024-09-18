// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  const newElement = document.createElement('div');
  newElement.innerText = 'Olá, esta é uma injeção de JavaScript!!!';
  newElement.style.position = 'fixed';
  newElement.style.bottom = '10px';
  newElement.style.right = '10px';
  newElement.style.backgroundColor = 'lightblue';
  newElement.style.padding = '10px';
  newElement.style.zIndex = '9999';
  document.body.appendChild(newElement);
})();
