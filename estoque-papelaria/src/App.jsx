import { useState } from 'react';
import './App.css';


function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [preco, setPreco] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');

  const cadastrarProduto = (e) => {
    e.preventDefault();
    setErro('');

    const qtdNum = parseInt(quantidade, 10);
    const minNum = parseInt(estoqueMinimo, 10);
    const precoNum = parseFloat(preco);

    if (nome.trim() === '') {
      setErro('Digite o nome do produto.');
      return;
    }

    if (isNaN(qtdNum) || qtdNum < 0) {
      setErro('Informe uma quantidade válida (maior ou igual a 0).');
      return;
    }

    if (isNaN(minNum) || minNum < 0) {
      setErro('Informe um estoque mínimo válido (maior ou igual a 0).');
      return;
    }

    if (isNaN(precoNum) || precoNum <= 0) {
      setErro('Informe um preço unitário válido (maior que 0).');
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome: nome.trim(),
      quantidade: qtdNum,
      estoqueMinimo: minNum,
      preco: precoNum,
    };

    setProdutos([...produtos, novoProduto]);
    
    // Limpar campos
    setNome('');
    setQuantidade('');
    setEstoqueMinimo('');
    setPreco('');
  };

  const excluirProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const alterarEstoque = (id, delta) => {
    setProdutos(
      produtos.map((p) => {
        if (p.id === id) {
          const novaQtd = p.quantidade + delta;
          return { ...p, quantidade: novaQtd < 0 ? 0 : novaQtd };
        }
        return p;
      })
    );
  };

  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce((acc, p) => acc + p.quantidade * p.preco, 0);

  return (
    <div>
      <h1>Controle de Estoque - Papelaria</h1>

      <form onSubmit={cadastrarProduto}>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Quantidade: </label>
          <input
            type="number"
            placeholder="Qtd inicial"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>

        <div>
          <label>Estoque Mínimo: </label>
          <input
            type="number"
            placeholder="Estoque mínimo"
            value={estoqueMinimo}
            onChange={(e) => setEstoqueMinimo(e.target.value)}
          />
        </div>

        <div>
          <label>Preço Unitário: </label>
          <input
            type="number"
            step="0.01"
            placeholder="Preço R$"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar Produto</button>
      </form>

      {erro && <p>{erro}</p>}

      <hr />

      <p>Total de produtos cadastrados: {totalProdutos}</p>
      <p>Valor total do estoque: R$ {valorTotalEstoque.toFixed(2)}</p>

      <hr />

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado no momento.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Est. Mínimo</th>
              <th>Preço Unit.</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => {
              const reposicao = p.quantidade < p.estoqueMinimo;

              return (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>
                    <button type="button" onClick={() => alterarEstoque(p.id, -1)}>-</button>
                    {p.quantidade}
                    <button type="button" onClick={() => alterarEstoque(p.id, 1)}>+</button>
                  </td>
                  <td>{p.estoqueMinimo}</td>
                  <td>R$ {p.preco.toFixed(2)}</td>
                  <td>{reposicao ? 'Reposição necessária' : 'OK'}</td>
                  <td>
                    <button type="button" onClick={() => excluirProduto(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default App;