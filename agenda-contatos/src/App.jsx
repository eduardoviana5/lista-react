import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [contatos, setContatos] = useState([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')


  function cadastrar (e) {
    e.preventDefault()

     if (!nome.trim() || !telefone.trim() || !email.trim()) {
      setErro('Nome, telefone e e-mail são campos obrigatórios.');
      return;
    }


    const novoContato = {
      id: Date.now(),
      nome,
      telefone,
      email,
      empresa,
    }

    setContatos([...contatos, novoContato])
    setNome('')
    setTelefone('')
    setEmail('')
    setEmpresa('')
    setErro('')
  }

  function excluir (id) {
    setContatos(contatos.filter((contato) => contato.id !== id))
  }

  const contatosFiltrados = contatos.filter((contato) =>
    contato.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div>
      <h1>Agenda de Contatos Profissionais</h1>

      
      <form onSubmit={cadastrar}>
        <h2>Novo Contato</h2>
        
         {erro && <p className="erro">{erro}</p>}

        <input
          type="text"
          placeholder="Nome completo *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone *"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Empresa *"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />

        
        <button type="submit">Cadastrar Contato</button>
      </form>

      <hr/>


      <div>
        <h2>Contatos ({contatos.length})</h2>

        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {contatosFiltrados.length === 0 ? (
          <p>Nenhum contato encontrado.</p>
        ) : (
          <div>
            {contatosFiltrados.map((contato) => (
              <div key={contato.id} className="card-contato">
                <h3>{contato.nome}</h3>
                <p><strong>Empresa:</strong> {contato.empresa}</p>
                <p><strong>Telefone:</strong> {contato.telefone}</p>
                <p><strong>E-mail:</strong> {contato.email}</p>
                <button onClick={() => excluir(contato.id)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App