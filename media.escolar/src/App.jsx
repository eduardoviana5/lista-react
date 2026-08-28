import { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [n3, setN3] = useState('');
  const [n4, setN4] = useState('');
  const [resultado, setResultado] = useState('');
  const [situacao, setSituacao] = useState('');

  function calcularMedia(evento) {
    evento.preventDefault();

    const nota1 = Number(n1);
    const nota2 = Number(n2);
    const nota3 = Number(n3);
    const nota4 = Number(n4);

    if (
      n1 === '' || n2 === '' || n3 === '' || n4 === '' ||
      isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4) ||
      nota1 < 0 || nota1 > 10 ||
      nota2 < 0 || nota2 > 10 ||
      nota3 < 0 || nota3 > 10 ||
      nota4 < 0 || nota4 > 10
    ) {
      setResultado('Por favor, digite notas válidas entre 0 e 10.');
      setSituacao('');
      return;
    }

    if (!nome.trim()) {
      setResultado('Por favor, informe o nome do aluno.');
      setSituacao('');
      return;
    }

    const media = (nota1 + nota2 + nota3 + nota4) / 4;
    const mediaFormatada = media.toFixed(1);

    let status = '';
    let classeStatus = '';

    if (media >= 7) {
      status = 'Aprovado';
      classeStatus = 'aprovado';
    } else if (media >= 5) {
      status = 'em Recuperação';
      classeStatus = 'recuperacao';
    } else {
      status = 'Reprovado';
      classeStatus = 'reprovado';
    }

    setSituacao(classeStatus);
    setResultado(`O aluno(a) ${nome} obteve média ${mediaFormatada} e está ${status}.`);
  }

  function limpar() {
    setNome('');
    setN1('');
    setN2('');
    setN3('');
    setN4('');
    setResultado('');
    setSituacao('');
  }

  return (
    <div className="container">
      <form onSubmit={calcularMedia}>
        <h2>SISTEMA DE MÉDIA ESCOLAR</h2>

        <label htmlFor="nome">Nome do Aluno:</label>
        <input
          id="nome"
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
        />
        <br />

        <label htmlFor="n1">Nota 1:</label>
        <input
          id="n1"
          type="number"
          step="0.1"
          placeholder="0 a 10"
          value={n1}
          onChange={(evento) => setN1(evento.target.value)}
        />
        <br />

        <label htmlFor="n2">Nota 2:</label>
        <input
          id="n2"
          type="number"
          step="0.1"
          placeholder="0 a 10"
          value={n2}
          onChange={(evento) => setN2(evento.target.value)}
        />
        <br />

        <label htmlFor="n3">Nota 3:</label>
        <input
          id="n3"
          type="number"
          step="0.1"
          placeholder="0 a 10"
          value={n3}
          onChange={(evento) => setN3(evento.target.value)}
        />
        <br />

        <label htmlFor="n4">Nota 4:</label>
        <input
          id="n4"
          type="number"
          step="0.1"
          placeholder="0 a 10"
          value={n4}
          onChange={(evento) => setN4(evento.target.value)}
        />
        <br />

        <button type="submit" style={{ marginTop: '15px', marginRight: '10px' }}>
          Calcular Média
        </button>

        <button type="button" onClick={limpar} style={{ marginTop: '15px' }}>
          Limpar
        </button>
      </form>

      {resultado && (
        <div className={`resultado ${situacao}`} style={{ marginTop: '15px', fontWeight: 'bold' }}>
          {resultado}
        </div>
      )}
    </div>
  );
}

export default App;