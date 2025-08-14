import { useCart } from "../../../contexts/CartContext";
import type Produtos from "../../../models/Produtos";
import BotaoAcao from "../../botoes/BotaoAcao";

interface CardProdutosProps {
    produto: Produtos;
}

function CardProdutos({ produto }: CardProdutosProps) {
    const { adicionarProduto } = useCart();
    return (
        <div
            className="
        group relative rounded-lg p-2 bg-white
        border border-[#ececf0]
        shadow-[0_4px_12px_rgba(0,0,0,.04)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,.08)]
        hover:-translate-y-0.5 transition
        flex flex-col
      "
        >
            {/* faixa no topo (paleta) */}
            <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-lg bg-gradient-to-r from-[#7d8d2a] to-[#e7a545]" />

            {/* Imagem (agora quadrada com h-24 e w-full) */}
            <div className="mb-2 w-full h-24 overflow-hidden bg-[#f6f6f8]">
                <img
                    src={produto.picture}
                    alt={produto.nameProduct}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                />
            </div>

            <div className="space-y-1 pt-1 flex flex-col flex-grow">
                <div className="text-xs tracking-wide uppercase text-gray-500">
                    {produto.category?.categoria}
                </div>

                <h3 className="text-sm font-extrabold text-[#1f1f1f] uppercase">
                    {produto.nameProduct}
                </h3>

                <p className="text-xs text-gray-600 leading-snug line-clamp-2 flex-grow">
                    {produto.description}
                </p>

                {/* Bloco preço + ação */}
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-s font-extrabold tracking-tight text-[#1a1a1a]">
                        R$ {produto.price}
                    </span>
                    <BotaoAcao className="bg-[#7d8d2a] flex items-center hover:brightness-110 w-25 h-8 px-2 py-0.5 text-xs"
                    onClick={() => adicionarProduto(produto)}>
                        ADICIONAR
                    </BotaoAcao>
                </div>
            </div>
        </div>
    );
}

export default CardProdutos;