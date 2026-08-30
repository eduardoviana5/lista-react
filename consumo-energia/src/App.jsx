import { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [potencia, setPotencia] = useState('');
  const [horasDia, setHorasDia] = useState('');
  const [diasMes, setDiasMes] = useState('');
  const [tarifa, setTarifa] = useState('');
  const [consumo, setConsumo] = useState(null);
  const [custo, setCusto] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  function calcularConsumo(evento) {
    evento.preventDefault();

    if (
      nome.trim() === '' || equipamento.trim() === '' ||
      potencia === '' || horasDia === '' ||
      diasMes === '' || tarifa === ''
    ) {
      setMensagem('Preencha todos os campos.');
      setConsumo(null);
      setCusto(null);
      return;
    }

    if (
      Number(potencia) <= 0 ||
      Number(horasDia) <= 0 || Number(horasDia) > 24 ||
      Number(diasMes) <= 0 || Number(diasMes) > 31 ||
      Number(tarifa) <= 0
    ) {
      setMensagem('Verifique os valores informados.');
      setConsumo(null);
      setCusto(null);
      return;
    }

    setMensagem('');

    const potenciaNumero = Number(potencia);
    const horasNumero = Number(horasDia);
    const diasNumero = Number(diasMes);
    const tarifaNumero = Number(tarifa);

    const consumoCalculado = (potenciaNumero * horasNumero * diasNumero) / 1000;
    const custoCalculado = consumoCalculado * tarifaNumero;

    if (consumoCalculado <= 30) {
      setClassificacao('Consumo baixo');
    } else if (consumoCalculado <= 100) {
      setClassificacao('Consumo moderado');
    } else {
      setClassificacao('Consumo elevado');
    }

    setConsumo(consumoCalculado);
    setCusto(custoCalculado);
  }

  function limparFormulario() {
    setNome(''); setEquipamento(''); setPotencia('');
    setHorasDia(''); setDiasMes(''); setTarifa('');
    setConsumo(null); setCusto(null);
    setClassificacao(''); setMensagem('');
  }

  return (
    <main>
      <h1>Simulador de Consumo de Energia</h1>
      <p>Descubra quanto um equipamento consome por mês.</p>
      <form onSubmit={calcularConsumo}>
        <div>
          <label htmlFor="nome">Nome do usuário:</label>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </div>
        <div>
          <label htmlFor="equipamento">Equipamento:</label>
          <input 
            id="equipamento" 
            type="text"
            placeholder="Exemplo: Geladeira"
            value={equipamento}
            onChange={(evento) => setEquipamento(evento.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="potencia">Potência em watts:</label>
          <input 
            id="potencia" 
            type="number" 
            min="1"
            placeholder="Exemplo: 300"
            value={potencia}
            onChange={(evento) => setPotencia(evento.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="horasDia">Horas utilizadas por dia:</label>
          <input 
            id="horasDia" 
            type="number" 
            min="0" 
            max="24" 
            step="0.5"
            value={horasDia}
            onChange={(evento) => setHorasDia(evento.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="diasMes">Dias utilizados no mês:</label>
          <input 
            id="diasMes" 
            type="number" 
            min="1" 
            max="31"
            value={diasMes}
            onChange={(evento) => setDiasMes(evento.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="tarifa">Tarifa de energia por kWh:</label>
          <input 
            id="tarifa" 
            type="number" 
            min="0" 
            step="0.01"
            placeholder="Exemplo: 1.10"
            value={tarifa}
            onChange={(evento) => setTarifa(evento.target.value)} 
          />
        </div>
        <button type="submit">Calcular consumo</button>
        <button type="button" onClick={limparFormulario}>
          Limpar
        </button>
      </form>
      
      {mensagem && (
        <p className="mensagem-erro">{mensagem}</p>
      )}
      
      {consumo !== null && (
        <section className="resultado">
          <h2>Resultado da simulação</h2>
          <p><strong>Usuário:</strong> {nome}</p>
          <p><strong>Equipamento:</strong> {equipamento}</p>
          <p><strong>Consumo mensal:</strong> {consumo.toFixed(2)} kWh</p>
          <p><strong>Custo estimado:</strong> {custo.toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
          })}</p>
          <p><strong>Classificação:</strong> {classificacao}</p>
        </section>
      )}
    </main>
  );
}
export default App;