// content.js
console.log("JavaScript injetado em uma página!");

(function() {
  const newElement = document.createElement('div');
  newElement.innerText = 'JavaScript injetado!!!';
  newElement.style.position = 'fixed';
  newElement.style.bottom = '10px';
  newElement.style.right = '10px';
  newElement.style.backgroundColor = 'red';
  newElement.style.padding = '10px';
  newElement.style.zIndex = '9999';
  document.body.appendChild(newElement);
})();
function minhaFuncao() {

  const divElement = document.querySelector('.q-item__label.text-bold');
  if (divElement) {

      const content = divElement.textContent.trim();
      console.log(content); 
      alert("Funcionou: " + content); 

  } else {

      console.log('Elemento não encontrado');
      alert("Não funcionou");
  }
}
setTimeout(minhaFuncao, 3000);

//08/09/2024#836281arrow_drop_down
