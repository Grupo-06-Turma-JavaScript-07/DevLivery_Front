// src/pages/carrinho/Carrinho.tsx
import { useCart } from "../../contexts/CartContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Link } from "react-router-dom";
import { ShoppingCart, X } from "@phosphor-icons/react";
import type Produtos from "../../models/Produtos";

const CarrinhoVazio = () => (
    <div className="text-center bg-white p-10 rounded-lg shadow">
        <ShoppingCart size={64} className="mx-auto text-gray-300" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-700">Seu carrinho está vazio</h2>
        <p className="mt-2 text-gray-500">Adicione produtos do nosso cardápio para começar!</p>
        <Link to="/cardapio">
            <button className="mt-6 bg-[#7d8d2a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#6a7a24] transition-colors">
                Ver Cardápio
            </button>
        </Link>
    </div>
);

export default function Carrinho() {
    const { itens, removerProduto, limparCarrinho } = useCart();
    const total = itens.reduce((sum, item) => sum + parseFloat(String(item.price)), 0);

    function finalizarCompra() {
        ToastAlerta("Obrigado por comprar conosco!", 'sucesso');
        limparCarrinho();
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Meu Carrinho</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Coluna Esquerda: Itens e Endereço */}
                <div className="lg:col-span-2 space-y-6">
                    {itens.length === 0 ? (
                        <CarrinhoVazio />
                    ) : (
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                            {itens.map((item: Produtos) => (
                                <div key={item.id} className="flex items-center border-b last:border-b-0 py-2">
                                    <img src={item.picture} alt={item.nameProduct} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="flex-1 mx-4">
                                        <h3 className="font-bold text-lg text-gray-800">{item.nameProduct}</h3>
                                        <p className="font-bold text-lg text-[#7d8d2a] mt-1">R$ {parseFloat(String(item.price)).toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removerProduto(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full">
                                        <X size={20} weight="bold" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CAMPO DE ENDEREÇO ADICIONADO */}
                    {itens.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Endereço de Entrega</h2>
                            <input
                                type="text"
                                placeholder="Digite seu endereço completo (Rua, Número, Bairro)"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                            />
                        </div>
                    )}
                </div>

                {/* Resumo do Pedido */}
                <aside className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-28">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-4">Resumo do Pedido</h2>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxa de Entrega</span>
                            <span>R$ 5.00</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-gray-800 border-t mt-4 pt-4">
                        <span>Total</span>
                        <span>R$ {(total + 5).toFixed(2)}</span>
                    </div>

                    {/* INFORMAÇÃO DE PAGAMENTO ADICIONADA */}
                    <div className="mt-6 bg-orange-100 border-l-4 border-[#e7a545] p-3 rounded text-orange-700">
                        <p className="font-semibold">Forma de Pagamento</p>
                        <p className="text-sm">O valor da compra deve ser pago com corridas, a cada 10 reais, 1km!</p>
                    </div>

                    <button
                        onClick={finalizarCompra}
                        disabled={itens.length === 0}
                        className="w-full mt-6 bg-[#7d8d2a] text-white font-semibold py-3 rounded-lg hover:bg-[#6a7a24] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Finalizar Compra
                    </button>
                </aside>
            </div>
        </div>
    );
}