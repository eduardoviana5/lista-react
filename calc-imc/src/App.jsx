import { useState } from 'react'
import './App.css'



function App(){
     const [nome, setNome] =useState('');
     const [peso, setPeso] =useState('');
     const [altura, setAltura] =useState('');
     const  [resultado, setResultado] =useState('');
    
function calcularImc(evento){
  evento.preventDefault();

  const pesoNum = Number(peso);
  const alturaNum = Number(altura);
  
  if (!pesoNum || !alturaNum) {
      setResultado('Por favor, preencha o peso e a altura com valores válidos.');
      return;
  }

const imc = pesoNum / (alturaNum * alturaNum);

    let categoria ='';
    if (imc < 18.5) categoria = 'Abaixo do peso';
    else if (imc < 25) categoria = 'Peso normal';
    else if (imc < 30) categoria = 'Sobrepeso';
    else if (imc < 35) categoria = 'Obesidade Grau I';
    else if (imc < 40) categoria = 'Obesidade Grau II';
    else categoria = 'Obesidade Grau III';

    const textoNome = nome ? `${nome}, o seu` : 'Seu';
    setResultado(`${textoNome} IMC é ${imc.toFixed(2)} (${categoria})`);
}


  return(
    <div>
    <form onSubmit={calcularImc}>
      <h2>CALCULADORA IMC</h2>

      <label htmlFor="nome">Nome:</label>
      <input
          id='nome'
          type="text"
          placeholder='Digite o seu nome'
          value={nome}
          onChange={(evento) =>setNome(evento.target.value)}
      />
      <br/>

      <label htmlFor="peso">Peso:</label>
      <input
          id='peso'
          type="text"
          placeholder='Digite o seu peso'
          value={peso}
          onChange={(evento) =>setPeso(evento.target.value)}
      />
      <br/>

      <label htmlFor="altura">Altura:</label>
      <input
          id='altura'
          type="text"
          placeholder='Digite a sua altura'
          value={altura}
          onChange={(evento) =>setAltura(evento.target.value)}
      />
      <br/> 

        <button type="submit" style={{ marginTop: '15px' }}>
          Calcular
        </button>
      </form>

      { resultado &&(
        <div style={{marginTop: '15px', fontWeight: 'bold'}}>
          {resultado}
        </div>
      )}
    </div>
  )
}
export default App;