import { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  function calcularIdade(e) {
    e.preventDefault();
     setErro('');

     
    if (!nome.trim()) {
      setErro('Por favor, informe o nome.');
      setResultado(null);
      return;
    }

    if (!dataNascimento) {
      setErro('Por favor, informe uma data de nascimento.');
      setResultado(null);
      return;
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    if (nascimento > hoje) {
      setErro('A data de nascimento não pode ser no futuro.');
      setResultado(null);
      return;
    }

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    if (isNaN(idade)) {
      setErro('Data de nascimento inválida.');
      setResultado(null);
      return;
    }

    let classificacao = '';
    if (idade <= 12) {
      classificacao = 'Criança';
    } else if (idade <= 17) {
      classificacao = 'Adolescente';
    } else if (idade <= 59) {
      classificacao = 'Adulto';
    } else {
      classificacao = 'Pessoa Idosa';
    }

    setResultado({
      nome,
      idade,
      classificacao,
    });
  }

  function limpar() {
    setNome('');
    setDataNascimento('');
    setErro('');
    setResultado(null);
  }

  return (
    <main>
      <h1>Calculadora de Idade</h1>

      <form onSubmit={calcularIdade}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Calcular idade</button>
          <button type="button" onClick={limpar}>
            Limpar
          </button>
        </div>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {resultado && (
        <div className="resultado">
          <p>
            Nome: <strong>{resultado.nome}</strong>
          </p>
          <p>
            Idade: <strong>{resultado.idade} anos</strong>
          </p>
          <p>
            Classificação: <strong>{resultado.classificacao}</strong>
          </p>
        </div>
      )}
    </main>
  );
}

export default App;