import { useState } from 'react'
import './App.css'

function App() {
  const [temp, setTemp] = useState('')
  const [escalaOrigem, setEscalaOrigem] = useState('C')
  const [escalaDestino, setEscalaDestino] = useState('F')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function converter(evento) {
    evento.preventDefault()
    setErro('')

    if (temp === '') {
      setErro('Por favor, informe uma temperatura válida.')
      setResultado(null)
      return
    }

    const tempNum = Number(temp)
    let valorConvertido = 0

    if (escalaOrigem === 'C' && escalaDestino === 'F') {
      valorConvertido = (tempNum * 1.8) + 32
    } else if (escalaOrigem === 'F' && escalaDestino === 'C') {
      valorConvertido = (tempNum - 32) / 1.8
    } else {
      valorConvertido = tempNum
    }

    setResultado(valorConvertido.toFixed(2))
  }

  function novaConversao() {
    setTemp('')
    setEscalaOrigem('C')
    setEscalaDestino('F')
    setResultado(null)
    setErro('')
  }

  return (
    <div>
      <h2>CONVERSOR DE TEMPERATURAS</h2>


      <form onSubmit={converter}>
        <div>
          <label htmlFor="temp">Temperatura: </label>
          <input
            id="temp"
            type="number"
            step="any"
            placeholder="Digite a temperatura"
            value={temp}
            onChange={(evento) => setTemp(evento.target.value)}
          />
        </div>
        


        <div>
          <label htmlFor="origem">De: </label>
          <select
            id="origem"
            value={escalaOrigem}
            onChange={(evento) => setEscalaOrigem(evento.target.value)}
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
        


        <div>
          <label htmlFor="destino">Para: </label>
          <select
            id="destino"
            value={escalaDestino}
            onChange={(evento) => setEscalaDestino(evento.target.value)}
          >
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
        
        

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button type="submit">Converter Temperatura</button>
      </form>

      {resultado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultado:</h3>
          <p>
            {temp}°{escalaOrigem} equivale a <strong>{resultado}°{escalaDestino}</strong>
          </p>

          <button onClick={novaConversao}>Nova conversão</button>
        </div>
      )}
    </div>
  )
}

export default App