import { useState } from 'react'
import './App.css'

function App() {
  const [moradores, setMoradores] = useState('')
  const [banhosPorPessoa, setBanhosPorPessoa] = useState('')
  const [tempoAtual, setTempoAtual] = useState('')
  const [tempoNovo, setTempoNovo] = useState('')
  const [vazao, setVazao] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcularEconomia(e) {
    e.preventDefault()

    const numMoradores = Number(moradores)
    const numBanhos = Number(banhosPorPessoa)
    const tAtual = Number(tempoAtual)
    const tNovo = Number(tempoNovo)
    const numVazao = Number(vazao)

    if (isNaN(numMoradores) || isNaN(numBanhos) || isNaN(tAtual) || isNaN(tNovo) || isNaN(numVazao)) {
      setErro('Por favor, preencha todos os campos com números válidos.')
      setResultado(null)
      return
    }

    if (numMoradores <= 0 || numBanhos <= 0 || tAtual <= 0 || tNovo <= 0 || numVazao <= 0) {
      setErro('Os valores devem ser maiores que zero.')
      setResultado(null)
      return
    }

    if (tNovo > tAtual) {
      setErro('O novo tempo de banho não pode ser maior do que o tempo atual.')
      setResultado(null)
      return
    }

    setErro('')

    const banhosTotaisDia = numMoradores * numBanhos
    const consumoAtualDia = banhosTotaisDia * tAtual * numVazao
    const consumoPlanejadoDia = banhosTotaisDia * tNovo * numVazao

    const economiaDiaria = consumoAtualDia - consumoPlanejadoDia
    const economiaMensal = economiaDiaria * 30

    setResultado({
      consumoAtualDia,
      consumoPlanejadoDia,
      economiaDiaria,
      economiaMensal
    })
  }

  return (
    <div>
      <h1>Simulador de Economia de Água</h1>

      <form onSubmit={calcularEconomia}>
        <div>
          <label>Quantidade de moradores: </label>
          <input 
            type="number" 
            value={moradores} 
            onChange={function(e) { setMoradores(e.target.value) }} 
          />
        </div>

        <div>
          <label>Banhos por pessoa ao dia: </label>
          <input 
            type="number" 
            value={banhosPorPessoa} 
            onChange={function(e) { setBanhosPorPessoa(e.target.value) }} 
          />
        </div>

        <div>
          <label>Tempo atual de banho (minutos): </label>
          <input 
            type="number" 
            value={tempoAtual} 
            onChange={function(e) { setTempoAtual(e.target.value) }} 
          />
        </div>

        <div>
          <label>Novo tempo planejado (minutos): </label>
          <input 
            type="number" 
            value={tempoNovo} 
            onChange={function(e) { setTempoNovo(e.target.value) }} 
          />
        </div>

        <div>
          <label>Vazão do chuveiro (litros por minuto): </label>
          <input 
            type="number" 
            value={vazao} 
            onChange={function(e) { setVazao(e.target.value) }} 
          />
        </div>

        <button type="submit">Calcular Economia</button>
      </form>

      {erro && (
        <div>
          <p style={{ color: 'red' }}>{erro}</p>
        </div>
      )}

      {resultado && (
        <div>
          <h2>Resultados da Estimativa</h2>
          <p>Consumo Atual Diário: {resultado.consumoAtualDia} litros</p>
          <p>Consumo Planejado Diário: {resultado.consumoPlanejadoDia} litros</p>
          <p><strong>Economia Diária:</strong> {resultado.economiaDiaria} litros</p>
          <p><strong>Economia Mensal (30 dias):</strong> {resultado.economiaMensal} litros</p>
          
          <div>
            <h3>Mensagem de Conscientização</h3>
            <p>
              Pequenas mudanças de hábito geram um grande impacto! Ao reduzir o tempo de banho, 
              você preserva os recursos hídricos do planeta e ainda economiza na conta de luz e água.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App