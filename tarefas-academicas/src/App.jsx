import { useState } from 'react'
import './App.css'

function App() {
  const [descricao, setDescricao] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')
  const [prioridade, setPrioridade] = useState('baixa')
  const [tarefas, setTarefas] = useState([])
  const [erro, setErro] = useState('')

  function cadastro(evento) {
    evento.preventDefault()
    setErro('')


    if (descricao.trim() === '') {
      setErro('Insira uma descrição para a tarefa.')
      return
    }

    const novaTarefa = {
      id: Date.now(),
      descricao,
      disciplina: disciplina.trim() !== '' ? disciplina : 'Geral',
      dataEntrega: dataEntrega !== '' ? dataEntrega : 'Sem data',
      prioridade,
      concluida: false
    }

    setTarefas([...tarefas, novaTarefa])
    setDescricao('')
    setDisciplina('')
    setDataEntrega('')
    setPrioridade('baixa')
  }

  function alternarConcluida(id) {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida }
      }
      return tarefa
    })
    setTarefas(tarefasAtualizadas)
  }

  function excluirTarefa(id) {
    const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.id !== id)
    setTarefas(tarefasFiltradas)
  }

 
  const totalPendentes = tarefas.filter((tarefa) => !tarefa.concluida).length
  const totalConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length

  return (
    <main className="container">
      <h2>Tarefas Acadêmicas</h2>

      <form onSubmit={cadastro}>
        <div>
          <label htmlFor="descricao">Descrição *:</label>
          <input
            id="descricao"
            type="text"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            placeholder="Ex: Ler capítulo 3 do livro"
          />
        </div>

        <div>
          <label htmlFor="disciplina">Disciplina:</label>
          <input
            id="disciplina"
            type="text"
            value={disciplina}
            onChange={(evento) => setDisciplina(evento.target.value)}
            placeholder="Ex: Engenharia de Software"
          />
        </div>

        <div>
          <label htmlFor="dataEntrega">Data de Entrega:</label>
          <input
            id="dataEntrega"
            type="date"
            value={dataEntrega}
            onChange={(evento) => setDataEntrega(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor="prioridade">Prioridade:</label>
          <select
            id="prioridade"
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>
      </form>

      {erro && <p className="lista-tarefas">{erro}</p>}

      <section className="painel-totais">
        <p>Pendentes: <strong>{totalPendentes}</strong></p>
        <p>Concluídas: <strong>{totalConcluidas}</strong></p>
      </section>

      <section>
        {tarefas.length === 0 ? (
          <p>Nenhuma tarefa cadastrada.</p>
        ) : (
          <ul>
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className={`item-tarefa ${tarefa.concluida ? 'concluida' : ''}`}
              >
                <div>
                  <h3>{tarefa.descricao}</h3>
                  <p><strong>Disciplina:</strong> {tarefa.disciplina}</p>
                  <p><strong>Data:</strong> {tarefa.dataEntrega}</p>
                  <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                </div>

                <div>
                  <button type="button" onClick={() => alternarConcluida(tarefa.id)}>
                    {tarefa.concluida ? 'Refazer' : 'Concluir'}
                  </button>
                  <button type="button" onClick={() => excluirTarefa(tarefa.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App