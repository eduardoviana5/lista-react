import { useState } from 'react';
import './App.css';

function App() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const [listaMovimentacoes, setListaMovimentacoes] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  function adicionarMovimentacao(e) {
    e.preventDefault();

    if (!descricao.trim() || !categoria.trim() || !data) {
      setMensagemErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const valorNum = parseFloat(valor);

    if (isNaN(valorNum) || valorNum <= 0) {
      setMensagemErro('O valor deve ser um número positivo maior que zero.');
      return;
    }

    const itemNovo = {
      id: Date.now(),
      descricao,
      valor: valorNum,
      tipo,
      categoria,
      data,
    };

    setListaMovimentacoes([...listaMovimentacoes, itemNovo]);
    setDescricao('');
    setValor('');
    setTipo('receita');
    setCategoria('');
    setData('');
    setMensagemErro('');
  }

  function excluirMovimentacao(id) {
    setListaMovimentacoes(listaMovimentacoes.filter((item) => item.id !== id));
  }

  const totalReceitas = listaMovimentacoes
    .filter((item) => item.tipo === 'receita')
    .reduce((acc, item) => acc + item.valor, 0);

  const totalDespesas = listaMovimentacoes
    .filter((item) => item.tipo === 'despesa')
    .reduce((acc, item) => acc + item.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <main>
      <h1>Controle de Orçamento Doméstico</h1>

      <form onSubmit={adicionarMovimentacao}>
        <div>
          <label htmlFor="descricao">Descrição *:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="valor">Valor (R$) *:</label>
          <input
            type="number"
            id="valor"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>

        <div>
          <label htmlFor="categoria">Categoria *:</label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="data">Data *:</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <button type="submit">Adicionar Movimentação</button>
      </form>

      {mensagemErro && <p className="erro">{mensagemErro}</p>}

      <section className="painel-totais">
        <h2>Resumo Financeiro</h2>
        <p>Total de Receitas: <strong>{formatarMoeda(totalReceitas)}</strong></p>
        <p>Total de Despesas: <strong>{formatarMoeda(totalDespesas)}</strong></p>
        <p className={saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>
          Saldo Final: <strong>{formatarMoeda(saldo)}</strong>
        </p>
      </section>

      <section className="tabela-movimentacoes">
        <h2>Movimentações</h2>
        {listaMovimentacoes.length === 0 ? (
          <p>Nenhuma movimentação registrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaMovimentacoes.map((item) => (
                <tr key={item.id}>
                  <td>{item.descricao}</td>
                  <td>{item.categoria}</td>
                  <td>{item.data}</td>
                  <td>{item.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
                  <td>{formatarMoeda(item.valor)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => excluirMovimentacao(item.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default App;