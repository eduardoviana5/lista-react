import { useState } from 'react';
import './App.css';

function App() {
  const temasIniciais = [
    { id: 1, nome: 'Robótica Aplicada', votos: 0 },
    { id: 2, nome: 'Sustentabilidade e Meio Ambiente', votos: 0 },
    { id: 3, nome: 'Exploração Espacial', votos: 0 },
    { id: 4, nome: 'Inteligência Artificial', votos: 0 },
  ];

  const [temas, setTemas] = useState(temasIniciais);

  function votar(id) {
    const novosTemas = temas.map((tema) => {
      if (tema.id === id) {
        return { ...tema, votos: tema.votos + 1 };
      }
      return tema;
    });
    setTemas(novosTemas);
  }

  function reiniciarVotacao() {
    const confirmacao = window.confirm('Deseja ZERAR os Votos?');
    if (confirmacao) {
      setTemas(temasIniciais);
    }
  }

  const totalVotos = temas.reduce((acc, item) => acc + item.votos, 0);

  const maiorVotacao = Math.max(...temas.map((t) => t.votos));

  const lideres = temas.filter((t) => t.votos === maiorVotacao && t.votos > 0);

  function obterStatusVencedor() {
    if (totalVotos === 0) {
      return 'Nenhum voto registrado ainda. Clique em um dos botões abaixo para votar.';
    }
    if (lideres.length > 1) {
      const nomesEmpatados = lideres.map((l) => l.nome).join(', ');
      return `Empate entre: ${nomesEmpatados}`;
    }
    return `Vencedor atual: ${lideres[0].nome}`;
  }

  return (
    <main>
      <h1>Sistema de Votação - Feira de Ciências</h1>

      <div className="status-votacao">
        <p><strong>Status:</strong> {obterStatusVencedor()}</p>
        <p>Total de Votos: <strong>{totalVotos}</strong></p>
      </div>

      <div className="lista-temas">
        {temas.map((tema) => {
          const percentual = totalVotos > 0 ? ((tema.votos / totalVotos) * 100).toFixed(1) : '0.0';

          return (
            <div key={tema.id} className="card-tema">
              <h3>{tema.nome}</h3>
              <p>Votos: {tema.votos} ({percentual}%)</p>
              <button type="button" onClick={() => votar(tema.id)}>
                Votar
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className="btn-reiniciar" onClick={reiniciarVotacao}>
        Reiniciar votação
      </button>
    </main>
  );
}

export default App;