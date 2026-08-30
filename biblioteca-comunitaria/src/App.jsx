import { useState } from 'react'
import './App.css'

function App() {
  const [livros, setLivros] = useState([])
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [ano, setAno] = useState('')
  const [categoria, setCategoria] = useState('')
  const [disponivel, setDisponivel] = useState(true)
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')


  function cadastro(e){
    e.preventDefault()
    setErro('')

    if (!titulo.trim() || !autor.trim()) {
      setErro('O título e o autor são obrigatórios!')
      return
    }

    const novoLivro = {
      id: Date.now(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      ano: ano || 'Não informado',
      categoria: categoria || 'Geral',
      disponivel: disponivel
    }

    setLivros([...livros, novoLivro])
    setTitulo('')
    setAutor('')
    setAno('')
    setCategoria('')
    setDisponivel(true)
    setErro('')
  }

  
  function excluir(id) {
    setLivros(livros.filter((livro) => livro.id !== id))
  }

 
  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div>
      <h1>Catálogo da Biblioteca Comunitária</h1>

      
      <section className="card-form">
        <h2>Cadastrar Novo Livro</h2>
        {erro && <p className="mensagem-erro">{erro}</p>}

        <form onSubmit={cadastro}>
          <div>
            <input
              type="text"
              placeholder="Título do livro *"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Autor *"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Ano de Publicação"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
            <input
              type="text"
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={disponivel}
                onChange={(e) => setDisponivel(e.target.checked)}
              />
              Livro disponível para empréstimo
            </label>
          </div>


          <button type="submit">Cadastrar Livro</button>
        </form>
      </section>

      
      <section className="controle-catalogo">
        <input
          type="text"
          className="campo-busca"
          placeholder="Pesquisar por título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="total-livros">
          Total no catálogo: <strong>{livros.length}</strong> {livros.length === 1 ? 'livro' : 'livros'}
        </div>
      </section>


       <section className="lista-livros"> 
        {livrosFiltrados.length === 0 ? (
          <p className="sem-resultados">Nenhum livro encontrado.</p>
        ) : (
          <div>
            {livrosFiltrados.map((livro) => (
              <div key={livro.id} className="card-livro">
                <h3>{livro.titulo}</h3>
                <p><strong>Autor:</strong> {livro.autor}</p>
                <p><strong>Ano:</strong> {livro.ano}</p>
                <p><strong>Categoria:</strong> {livro.categoria}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={livro.disponivel ? 'status-disponivel' : 'status-emprestado'}>
                    {livro.disponivel ? 'Disponível' : 'Emprestado'}
                  </span>
                </p>
               <button onClick={() => excluir(livro.id)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )} 
        </section> 
    </div>
  
  )
}
export default App