import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [desc, setDesc] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  function calcular(evento){
    evento.preventDefault()
    setErro('')
    setResultado(null)

    const precoNum = Number(preco)
    const descNum = Number(desc)

    if(nome.trim() === '' ){
      setErro("Por Favor, digite um nome válido")
      setResultado(null)
      return;
    }

    if(isNaN(precoNum) || precoNum <= 0 ){
      setErro("Por Favor, digite um preço válido")
      setResultado(null)
      return;
    }

    if(isNaN(descNum) || descNum < 0 || descNum > 100){
      setErro("Por Favor, digite um desconto entre 0 e 100")
      setResultado(null)
      return;
    }

    const calcDesc = precoNum * (descNum / 100)
    const precoFinal = precoNum - calcDesc

    setResultado({
      nomeProduto: nome,
      precoOriginal: precoNum,
      economizado: calcDesc,
      precoFinal: precoFinal
    })
  }

  function limpar() {
    setNome('');
    setPreco('');
    setDesc('');
    setErro('');
    setResultado(null);
  }

  return (
    <div>
      <h2>Calculadora de Descontos</h2>

      <form onSubmit={calcular}>
        <div>
          <label htmlFor='nome'>Nome do Produto:</label>
          <input
            id='nome'
            type="text"
            placeholder='Digite o nome do produto'
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor='preco'>Preço:</label>
          <input
            id='preco'
            type="number"
            placeholder='Digite o preço do produto'
            value={preco}
            onChange={(evento) => setPreco(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor='desc'>Desconto:</label>
          <input
            id='desc'
            type="number"
            placeholder='Digite o desconto a ser aplicado'
            value={desc}
            onChange={(evento) => setDesc(evento.target.value)}
          />
        </div>

        
        <div className="botoes">
          <button type='submit'>Aplicar Desconto</button>
          <button type='button' onClick={limpar}>Limpar</button>
        </div>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {resultado && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <p>Produto: <strong>{resultado.nomeProduto}</strong></p>
          <p>Preço original: <strong>{formatarMoeda(resultado.precoOriginal)}</strong></p>
          <p>Valor economizado com desconto: <strong>{formatarMoeda(resultado.economizado)}</strong></p>
          <p>Preço Final: <strong>{formatarMoeda(resultado.precoFinal)}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App;