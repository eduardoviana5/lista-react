import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [alunos, setAlunos] = useState([])


  function adicionarAluno(e) {
    e.preventDefault()
    if (!nome.trim()) return

    const novoAluno = {
      id: Date.now(),
      nome: nome.trim(),
      status: 'pendente'
    }

    setAlunos([...alunos, novoAluno])
    setNome('')
  }

 
  function alterarStatus(id, novoStatus) {
    setAlunos(
      alunos.map(function (aluno) {
        if (aluno.id === id) {
          return { ...aluno, status: novoStatus }
        }
        return aluno
      })
    )
  }

  function excluirAluno(id) {
    setAlunos(
      alunos.filter(function (aluno) {
        return aluno.id !== id
      })
    )
  }

  const totalAlunos = alunos.length
  const presentes = alunos.filter((a) => a.status === 'presente').length
  const ausentes = alunos.filter((a) => a.status === 'ausente').length
  const pendentes = alunos.filter((a) => a.status === 'pendente').length
  const percentualPresenca = totalAlunos > 0 ? ((presentes / totalAlunos) * 100).toFixed(1) : 0
  const chamadaFinalizada = totalAlunos > 0 && pendentes === 0

  return (
    <div className="container">
      <header>
        <h1>Controle de Frequência Escolar</h1>
      </header>


      <form onSubmit={adicionarAluno} className="form-cadastro">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Cadastrar Aluno</button>
      </form>

    
      <div className={`alerta ${chamadaFinalizada ? 'concluida' : 'pendente'}`}>
        {totalAlunos === 0 ? (
          <p>Nenhum aluno cadastrado.</p>
        ) : chamadaFinalizada ? (
          <p>Chamada concluída com sucesso!</p>
        ) : (
          <p>A chamada ainda não foi realizada totalmente ({pendentes} pendente(s)).</p>
        )}
      </div>

  
      <div>
        <div>
          <span>Total</span>
          <strong>{totalAlunos}</strong>
        </div>
        <div >
          <span>Presentes</span>
          <strong>{presentes}</strong>
        </div>
        <div>
          <span>Ausentes</span>
          <strong>{ausentes}</strong>
        </div>
        <div>
          <span>% Presença</span>
          <strong>{percentualPresenca}%</strong>
        </div>
      </div>

     
      <div className="lista-alunos">
        <h2>Estudantes</h2>
        {alunos.length === 0 ? (
          <p>Nenhum aluno na lista.</p>
        ) : (
          alunos.map((aluno) => (
            <div key={aluno.id} className={`aluno-item ${aluno.status}`}>
              <span className="nome-aluno">{aluno.nome}</span>

              <div className="acoes">
                <button
                  type="button"onClick={() => alterarStatus(aluno.id, 'presente')}>
                  Presente
                </button>

                <button
                  type="button"onClick={() => alterarStatus(aluno.id, 'ausente')} >
                  Ausente
                </button>

                <button
                  type="button"onClick={() => excluirAluno(aluno.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App