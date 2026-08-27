import { useState } from 'react'
import './App.css'

function App(){
     const [participantes, setParticipantes] = useState([]); 
     const [nome, setNome] =useState('');
     const [cpf, setCpf] =useState('');
     const [erro, setErro] = useState('')
     
     const adicionarParticipante = (evento) =>{
      evento.preventDefault();
       
      //valida nome
      if (!nome.trim()) {
      setErro('Por favor, digite o nome do participante.');
      return;
    }

    //valida cpf
    if(!cpf.trim()){
      setErro('Por favor, digite o cpf');
      return;
    }

    // caso ja exista este cpf na lista
    const cpfJaExiste = participantes.some((p) => p.cpf === cpf.trim())
    if (cpfJaExiste) {
      setErro('Este CPF já está cadastrado!')
      return
    }

    const novoParticipante = {
      id: cpf.trim(), 
      nome: nome.trim(),
      cpf: cpf.trim(),
    }

    setParticipantes([novoParticipante, ...participantes])
    setNome('')
    setCpf('')
    setErro('')
  }

  const removerParticipante = (cpfParaRemover) => {
    setParticipantes(participantes.filter((p) => p.cpf !== cpfParaRemover))
  }

return(
  <div>
    <form onSubmit={adicionarParticipante}>
      <h2>REGISTRO DE PARTICIPANTES</h2>

      <label htmlFor='nome'>Nome:</label>
      <input
        id='nome'
        type="text"
        placeholder='Digite o seu nome'
        value={nome}
        onChange={(evento) =>setNome(evento.target.value)}  
      />
      <br/>
      
      <label htmlFor='cpf'>CPF:</label>
      <input
        id='cpf'
        type="text"
        placeholder='Digite o seu CPF'
        value={cpf}
        onChange={(evento) =>setCpf(evento.target.value)}  
      />
      <br/>
      
      <button type="submit">Cadastrar</button>
    </form>
    <br/><br/>

    <h3>Total de Participantes: {participantes.length}</h3>

    <ul>
        {participantes.map((p) => (
          // Usamos o p.cpf como key única
          <li key={p.cpf}>
            {p.nome} - CPF: {p.cpf}{' '}
            <button onClick={() => removerParticipante(p.cpf)}>Excluir</button>
          </li>
        ))}

    </ul>
    </div>
  )
}
export default App;