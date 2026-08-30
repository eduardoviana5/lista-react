import { useState } from 'react';
import './App.css';

const PERGUNTAS = [
  {
    pergunta: '[React] Qual hook é utilizado para gerenciar estado em componentes funcionais?',
    opcoes: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correta: 1,
  },
  {
    pergunta: '[CSS] Qual propriedade é utilizada para alterar a cor do texto de um elemento?',
    opcoes: ['background-color', 'font-style', 'color', 'text-align'],
    correta: 2,
  },
  {
    pergunta: '[HTML] Qual elemento HTML é correto para inserir uma quebra de linha?',
    opcoes: ['<break>', '<br>', '<lb>', '<line>'],
    correta: 1,
  },
  {
    pergunta: '[Git] Qual comando envia as alterações do repositório local para o repositório remoto?',
    opcoes: ['git commit', 'git pull', 'git fetch', 'git push'],
    correta: 3,
  },
  {
    pergunta: '[Geral] Qual é a capital do Brasil?',
    opcoes: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
    correta: 2,
  },
];

function App() {
  const [nome, setNome] = useState('');
  const [iniciado, setIniciado] = useState(false);
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [erro, setErro] = useState('');

  function iniciarQuiz(e) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro('Por favor, informe o seu nome para iniciar.');
      return;
    }
    setErro('');
    setIniciado(true);
  }

  function proximaPergunta() {
    if (opcaoSelecionada === null) {
      setErro('Selecione uma alternativa antes de prosseguir.');
      return;
    }

    setErro('');

    const acertou = opcaoSelecionada === PERGUNTAS[indicePergunta].correta;
    if (acertou) {
      setPontuacao(pontuacao + 1);
    }

    const proximoIndice = indicePergunta + 1;

    if (proximoIndice < PERGUNTAS.length) {
      setIndicePergunta(proximoIndice);
      setOpcaoSelecionada(null);
    } else {
      setFinalizado(true);
    }
  }

  function refazerQuiz() {
    setIndicePergunta(0);
    setOpcaoSelecionada(null);
    setPontuacao(0);
    setFinalizado(false);
    setIniciado(false);
    setNome('');
    setErro('');
  }

  function selecionarOpcao(index) {
    setOpcaoSelecionada(index);
    if (erro) setErro('');
  }

  const percentual = Math.round((pontuacao / PERGUNTAS.length) * 100);

  function obterMensagemDesempenho() {
    if (percentual === 100) return 'Excelente! Você acertou todas as questões!';
    if (percentual >= 70) return 'Muito bom! Você demonstrou ótimo conhecimento.';
    if (percentual >= 50) return 'Bom! Mas vale a pena dar mais uma estudada.';
    return 'Precisa praticar mais. Não desista e tente novamente!';
  }

  return (
    <main>
      <h1>Quiz de Conhecimentos Dev</h1>

      {!iniciado ? (
        <form onSubmit={iniciarQuiz}>
          <div>
            <label htmlFor="nome">Nome do Aluno:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          {erro && <p className="erro">{erro}</p>}
          <button type="submit">Iniciar Quiz</button>
        </form>
      ) : !finalizado ? (
        <div className="quiz-container">
          <p>Aluno: <strong>{nome}</strong></p>
          <h2>Pergunta {indicePergunta + 1} de {PERGUNTAS.length}</h2>
          <h3>{PERGUNTAS[indicePergunta].pergunta}</h3>

          <div className="opcoes">
            {PERGUNTAS[indicePergunta].opcoes.map((opcao, index) => (
              <label key={index} className="opcao-item">
                <input
                  type="radio"
                  name="opcao"
                  checked={opcaoSelecionada === index}
                  onChange={() => selecionarOpcao(index)}
                />
                {opcao}
              </label>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="button" onClick={proximaPergunta}>
            {indicePergunta + 1 === PERGUNTAS.length ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      ) : (
        <div className="resultado">
          <h2>Resultado do Quiz</h2>
          <p>Aluno: <strong>{nome}</strong></p>
          <p>Pontuação: <strong>{pontuacao} de {PERGUNTAS.length}</strong></p>
          <p>Aproveitamento: <strong>{percentual}%</strong></p>
          <p className="mensagem">{obterMensagemDesempenho()}</p>

          <button type="button" onClick={refazerQuiz}>
            Refazer quiz
          </button>
        </div>
      )}
    </main>
  );
}

export default App;