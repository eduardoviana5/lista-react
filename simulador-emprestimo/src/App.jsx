import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [prazo, setPrazo] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular(e) {
    e.preventDefault()
    setErro('')

    const numCapital = Number(capital)
    const numTaxa = Number(taxa)
    const numPrazo = Number(prazo, 10)

    if (!nome.trim()) {
      setErro('Por favor, informe o seu nome.')
      setResultado(null);
      return
    }

   if (
      isNaN(numCapital) || numCapital <= 0 ||
      isNaN(numTaxa) || numTaxa <= 0 ||
      isNaN(numPrazo) || numPrazo <= 0
    ) {
      setErro('Os valores de Capital, Taxa e Prazo devem ser maiores que zero.')
      return
    }


    const jurosCalculados = numCapital * (numTaxa / 100) * numPrazo
    const valorTotal = numCapital + jurosCalculados
    const valorParcela = valorTotal / numPrazo

    const formatarBRL = (valor) => {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

  
    setResultado({
      nome,
      capitalFormatado: formatarBRL(numCapital),
      jurosFormatados: formatarBRL(jurosCalculados),
      totalFormatado: formatarBRL(valorTotal),
      parcelaFormatada: formatarBRL(valorParcela),
      prazo: numPrazo,
      taxa: numTaxa
    })
  }

  function limpar() {
    setNome('');
    setCapital('');
    setTaxa('');
    setPrazo('');
    setErro('');
    setResultado(null);
  }

  return (
    <div>
      <h2>Simulador de Empréstimo</h2>

      <form onSubmit={calcular} className="formulario">
        <div>
          <label htmlFor="nome">Nome do Cliente:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label htmlFor="capital">Capital Desejado (R$):</label>
          <input
            id="capital"
            type="number"
            step="0.01"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Ex: 5000"
          />
        </div>

        <div>
          <label htmlFor="taxa">Taxa de Juros Mensal (%):</label>
          <input
            id="taxa"
            type="number"
            step="0.01"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            placeholder="Ex: 2"
          />
        </div>

        <div>
          <label htmlFor="prazo">Prazo (em meses):</label>
          <input
            id="prazo"
            type="number"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            placeholder="Ex: 12"
          />
        </div>

        <button type="submit">Simular Empréstimo</button>
        <button type="button" onClick={limpar}>Limpar</button>
        </form>

     
      {erro && <p className="erro">{erro}</p>}


      {resultado && (
        <div className="resultado">
          <h3>Resumo da Simulação</h3>
          <p><strong>Cliente:</strong> {resultado.nome}</p>
          <p><strong>Valor Solicitado:</strong> {resultado.capitalFormatado}</p>
          <p><strong>Taxa Aplicada:</strong> {resultado.taxa}% ao mês</p>
          <p><strong>Prazo:</strong> {resultado.prazo} meses</p>
          <hr />
          <p><strong>Total de Juros:</strong> {resultado.jurosFormatados}</p>
          <p><strong>Valor Total a Pagar:</strong> {resultado.totalFormatado}</p>
          <p><strong>Parcela Estimada:</strong> {resultado.prazo}x de <strong>{resultado.parcelaFormatada}</strong></p>

          <small className="aviso">
            * O resultado desta simulação é apenas informativo e não representa proposta oficial de crédito.
          </small>
        </div>
      )}
    </div>
  )
}

export default App