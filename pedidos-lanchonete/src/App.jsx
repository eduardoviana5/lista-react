import { useState } from 'react'
import './App.css'

const MENU = [
  { id: 1, nome: 'X-Burguer', preco: 15.00 },
  { id: 2, nome: 'X-Salada', preco: 18.00 },
  { id: 3, nome: 'Batata Frita', preco: 12.00 },
  { id: 4, nome: 'Refrigerante', preco: 6.00 },
  { id: 5, nome: 'Suco Natural', preco: 8.00 }
]

function App() {
  const [pedido, setPedido] = useState([])
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  function adicionarProduto(produto) {
    setMensagemSucesso('')
    const achou = pedido.find(item => item.id === produto.id)

    if (achou) {
      setPedido(pedido.map(item =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      ))
    } else {
      setPedido([...pedido, { ...produto, quantidade: 1 }])
    }
  }

  function aumentar(id) {
    setPedido(pedido.map(item =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ))
  }

  function diminuir(id) {
    setPedido(pedido.map(item =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    ))
  }

  function remover(id) {
    setPedido(pedido.filter(item => item.id !== id))
  }

  function finalizar(e) {
    e.preventDefault()
    if (pedido.length === 0) return

    setMensagemSucesso('Pedido finalizado com sucesso!')
    setPedido([])
  }

  const total = pedido.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  return (
    <div>
      <h1>Lanchonete</h1>

      <h2>Produtos</h2>
      <ul>
        {MENU.map(prod => (
          <li key={prod.id}>
            {prod.nome} - R$ {prod.preco.toFixed(2)}{' '}
            <button onClick={() => adicionarProduto(prod)}>Adicionar</button>
          </li>
        ))}
      </ul>

      <h2>Seu Pedido</h2>
      <form onSubmit={finalizar}>
        {pedido.length === 0 ? (
          <p>Nenhum item selecionado.</p>
        ) : (
          <ul>
            {pedido.map(item => (
              <li key={item.id}>
                {item.nome} - R$ {item.preco.toFixed(2)} x {item.quantidade} = R$ {(item.preco * item.quantidade).toFixed(2)}{' '}
                <button type="button" onClick={() => aumentar(item.id)}>+</button>
                <button type="button" onClick={() => diminuir(item.id)}>-</button>
                <button type="button" onClick={() => remover(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}

        <h3>Total: R$ {total.toFixed(2)}</h3>

        <button type="submit" disabled={pedido.length === 0}>
          Finalizar Pedido
        </button>
      </form>

      {mensagemSucesso && <p>{mensagemSucesso}</p>}
    </div>
  )
}

export default App