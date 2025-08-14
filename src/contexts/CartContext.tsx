// src/contexts/CartContext.tsx
import { createContext, type ReactNode, useContext, useState } from "react";
import { ToastAlerta } from "../utils/ToastAlerta";
import type Produtos from "../models/Produtos";



// Define o que o nosso contexto irá fornecer
interface CartContextProps {
  adicionarProduto: (produto: Produtos) => void;
  removerProduto: (produtoId: number) => void;
  limparCarrinho: () => void;
  itens: Produtos[];
  quantidadeItens: number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  // Estado que irá armazenar a lista de produtos do carrinho
  const [itens, setItens] = useState<Produtos[]>([]);

  // Função para adicionar um produto
  function adicionarProduto(produto: Produtos) {
    setItens(prevItens => [...prevItens, produto]);
    ToastAlerta("Produto adicionado ao carrinho!", 'sucesso');
  }

  // Função para remover um produto
  function removerProduto(produtoId: number) {
    setItens(prevItens => prevItens.filter(item => item.id !== produtoId));
    ToastAlerta("Produto removido do carrinho!", 'aviso');
  }

  // Função para limpar o carrinho (usada ao finalizar a compra)
  function limparCarrinho() {
    setItens([]);
  }

  return (
    <CartContext.Provider 
      value={{ 
        adicionarProduto, 
        removerProduto, 
        limparCarrinho, 
        itens, 
        quantidadeItens: itens.length // Expõe a quantidade de itens
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useCart() {
  return useContext(CartContext);
}