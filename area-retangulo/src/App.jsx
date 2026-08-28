import { useState } from 'react'
import './App.css'

function App() {
  const [ambiente, setAmbiente] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [largura, setLargura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const compNum = Number(comprimento);
  const largNum = Number(largura);

  return (
    <div>
      <h2>Área do Retângulo</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        setErro('');
        setResultado(null);

        if (!ambiente.trim()) {
          setErro('Preencha o nome do ambiente.');
          return;
        }

        if (isNaN(compNum) || isNaN(largNum) || compNum <= 0 || largNum <= 0) {
          setErro('Comprimento e largura devem ser maiores que zero.');
          return;
        }

        setResultado({
          nome: ambiente,
          comp: compNum,
          larg: largNum,
          area: (compNum * largNum).toFixed(2)
        });
      }}>
        <div>
          <label>Ambiente: </label>
          <input
            type="text"
            value={ambiente}
            onChange={(e) => setAmbiente(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Comprimento (m): </label>
          <input
            type="number"
            step="any"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Largura (m): </label>
          <input
            type="number"
            step="any"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
          />
        </div>

        <br />

        <div>
          <button type="submit">Calcular área</button>
          {' '}
          <button 
            type="button" 
            onClick={() => {
              setAmbiente('');
              setComprimento('');
              setLargura('');
              setResultado(null);
              setErro('');
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      {erro && (
        <p style={{ color: 'red' }}>{erro}</p>
      )}

      {resultado && (
        <div>
          <h3>Resultado</h3>
          <p>Ambiente: {resultado.nome}</p>
          <p>Valores usados: {resultado.comp}m x {resultado.larg}m</p>
          <p>Área: {resultado.area} m²</p>
        </div>
      )}
    </div>
  )
}

export default App