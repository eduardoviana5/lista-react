import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [salario, setSalario] = useState('')
  const [desc, setDesc] = useState('')
  const [beneficio, setBeneficio] = useState('')
  const [erro, setErro] = useState('')
  const [resultado, setResultado] = useState(null)

  const formatarBRL = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function calcular(e) {
    e.preventDefault()
    setErro('')


    const numSalario = Number(salario)
    const numDesc = Number(desc)
    const numBeneficio = Number(beneficio)

    
    if (nome.trim() === '') {
      setErro('Informe o seu nome!')
      setResultado(null) 
      return
    }

    if (isNaN(numSalario) || numSalario <= 0) {
      setErro('Informe um salário bruto válido e maior que zero!')
      setResultado(null)
      return
    }

    if (isNaN(numDesc) || numDesc < 0 || numDesc > 100) {
      setErro('Insira um percentual de desconto entre 0 e 100!')
      setResultado(null) 
      return
    }

    if (isNaN(numBeneficio) || numBeneficio < 0) {
      setErro('Informe um valor de benefício válido!')
      setResultado(null)
      return
    }

    
    const valorDescontado = (numSalario * numDesc) / 100
    const salarioLiquido = numSalario - valorDescontado + numBeneficio

    setResultado({
      nome: nome.trim(),
      salarioBruto: numSalario,
      porcentagemDesconto: numDesc,
      valorDescontado: valorDescontado,
      beneficio: numBeneficio,
      salarioLiquido: salarioLiquido,
    })
  }

  function limpar() {
    setNome('')
    setSalario('')
    setDesc('')
    setBeneficio('')
    setErro('')
    setResultado(null)
  }

  
  return (
    <div>
      <h1>Calculadora de Salário</h1>


      <form onSubmit={calcular} className="formulario">
        <div>
          <label htmlFor="nome">Nome do Colaborador:</label>
          <input
            id="nome"
            type="text"
            
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="salario">Salário Bruto (R$):</label>
          <input
            id="salario"
            type="number"
            step="0.01"
            
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="desc">Desconto (%):</label>
          <input
            id="desc"
            type="number"
            step="0.01"
            
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="beneficio">Benefícios (R$):</label>
          <input
            id="beneficio"
            type="number"
            step="0.01"

            value={beneficio}
            onChange={(e) => setBeneficio(e.target.value)}
          />
        </div>

        {erro && <div>{erro}</div>}

        <div>
          <button type="submit">
            Calcular
          </button>
          <button type="button" onClick={limpar}>
            Limpar
          </button>
        </div>
      </form>

      {resultado && (
        <div>
          <h2>Resumo do Pagamento</h2>
          <hr />
          <p><strong>Colaborador:</strong> {resultado.nome}</p>
          <p><strong>Salário Bruto:</strong> {formatarBRL(resultado.salarioBruto)}</p>
          <p><strong>Desconto ({resultado.porcentagemDesconto}%):</strong> - {formatarBRL(resultado.valorDescontado)}</p>
          <p><strong>Benefícios Adicionais:</strong> + {formatarBRL(resultado.beneficio)}</p>
          <div>
            <span>Salário Líquido:</span>
            <strong>{formatarBRL(resultado.salarioLiquido)}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

export default App