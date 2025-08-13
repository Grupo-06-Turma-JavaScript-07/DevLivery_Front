import BotaoAcao from '../../botoes/BotaoAcao';
import SeloDePreco from '../../selodepreco/SeloDePreco';
import Avaliacao from '../../avaliacao/Avaliacao';

interface CardProdutoProps {
  title: string;
  variantColor: string;
  image: string;
  price: number;
  old?: number;
  tag: string;
}

export default function CardProduto({ title, variantColor, image, price, old, tag }: CardProdutoProps) {
  return (
    <div className={`relative rounded-2xl p-5 shadow-xl bg-[#f1f0f3]/80 backdrop-blur border border-[#ececf0]`}>
      {/* Bloco de cor de fundo */}
      <div className={`absolute inset-0 -z-10 rounded-2xl ${variantColor}`} />

      {/* Imagem */}
      <div className="-mt-16 mb-4 mx-auto w-36 h-28 rotate-[-10deg] rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-white">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Badge de preço */}
      <div className="absolute -top-4 -right-2">
        <SeloDePreco price={price} old={old} className="bg-[#7d8d2a]" />
      </div>


            <div className="space-y-2 pt-2">
                <div className="text-sm tracking-wide uppercase opacity-90">{tag}</div>
                <h3 className="text-2xl font-extrabold text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">{title}</h3>
                <p className="text-sm text-[#2b2b2b] opacity-90">
                    Uma combinação deliciosa e saudável de ingredientes frescos e selecionados.
                </p>
                <BotaoAcao className="mt-2">ADICIONAR</BotaoAcao>
            </div>
        </div>
    );

}