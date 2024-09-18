import React, { useState } from "react";
import "./App.css";

const Container = ({ id, title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`container ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand} id={id}>
      <div className="header">
        <p className="textos">{title}</p>
      </div>
      {isExpanded && (
        <div className="content">
          <br />
          <p className="textos-baixos">{content}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1 className="crm-titulo">CRM</h1>
      <hr />
      <Container id="expandableContainer1" title="Empresas" content="Informações da Empresa." />
      <br />
      <Container id="expandableContainer2" title="Negociações" content="Registro das Negociações." />
      <br />
      <Container id="expandableContainer3" title="Produto das negociações " content="Informações dos Produto e das negociações ." />
      <br />
      <Container id="expandableContainer4" title="Produtos" content="Detalhes sobre os Produtos." />
      <br />
      <Container id="expandableContainer5" title="Campos personalizados " content="Campos personalizados  dos clientes." />
      <br />
      <Container id="expandableContainer6" title="Funil de vendas" content="Análise do Funil de vendas." />
      <br />
      <Container id="expandableContainer7" title="Etapas do funil de vendas " content="Registro das Etapas do funil de vendas." />
      <br />
      <Container id="expandableContainer8" title="Tarefas" content="lista de Tarefas" />
      <br />
      <Container id="expandableContainer9" title="Anotações" content="Anotações do cliente." />
      <br />
      <Container id="expandableContainer10" title="Equipes" content="Equipes" />
      <br />
      <Container id="expandableContainer11" title="Fontes" content="Fontes." />
      <br />
      <Container id="expandableContainer12" title="Campanhas" content="Campanhas." />
      <br />
      <Container id="expandableContainer13" title="Motivo da perda " content="Motivo da perda." />
    </div>
  );
}

export default App;
