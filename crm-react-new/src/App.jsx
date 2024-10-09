import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  // Carregar o token do Local Storage ao montar o componente
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []); // O array vazio garante que isso rode apenas quando o componente for montado

  const handleSave = () => {
    // Salvar o token no Local Storage
    localStorage.setItem('token', token);
    console.log('Token salvo no Local Storage:', token);
  };

  return (
    <div className="App">
      <h1 className="crm-titulo">Crm config</h1>
      <hr id="hr1" />
      <label className="textos-baixos">Token:</label>
      <input 
        type="text" 
        placeholder="seu token aqui" 
        value={token} // O campo de texto agora exibe o valor salvo
        onChange={(e) => setToken(e.target.value)} 
      />
      <br />
      <input type="button" id="salvar" value="Salvar" onClick={handleSave} />
      <div id="divisao"></div>
    </div>
  );
}

export default App;
