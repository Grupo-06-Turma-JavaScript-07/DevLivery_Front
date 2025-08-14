import BotaoAcao from '../../components/botoes/BotaoAcao';
import SeloDePreco from '../../components/selodepreco/SeloDePreco';

// Dados de exemplo para os produtos
const produtosExemplo = [
  {
    title: "Salada Caesar",
    tag: "Frango Grelhado",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
    price: 32,
    old: 40,
    variantColor: "bg-[#7d8d2a]", // Verde Oliva
  },
  {
    title: "Salmão Grelhado",
    tag: "com Legumes",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    price: 45,
    old: 55,
    variantColor: "bg-[#e7a545]", // Laranja Vibrante
  },
  {
    title: "Bowl de Açaí",
    tag: "com Frutas",
    image: "https://ik.imagekit.io/pedrolazzz/a%C3%A7ai-crop.png?updatedAt=1755023669920",
    price: 25,
    old: 30,
    variantColor: "bg-[#7d8d2a]", // Verde Oliva
  },
];

export default function Produtos() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {produtosExemplo.map((produto, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-5 shadow-xl bg-[#f1f0f3]/80 backdrop-blur border border-[#ececf0]`}
            >
              {/* Bloco de cor de fundo */}
              <div className={`absolute inset-0 -z-10 rounded-2xl ${produto.variantColor}`} />

              {/* Imagem */}
              <div className="-mt-16 mb-4 mx-auto w-36 h-28 rotate-[-10deg] rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-white">
                <img src={produto.image} alt={produto.title} className="w-full h-full object-cover" />
              </div>

              {/* Badge de preço */}
              <div className="absolute -top-4 -right-2">
                <SeloDePreco price={produto.price} old={produto.old} className="bg-[#7d8d2a]" />
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-sm tracking-wide uppercase opacity-90">{produto.tag}</div>
                <h3 className="text-2xl font-extrabold text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">
                  {produto.title}
                </h3>
                <p className="text-sm text-[#2b2b2b] opacity-90">
                  Uma combinação deliciosa e saudável de ingredientes frescos e selecionados.
                </p>
                <BotaoAcao className="mt-2">ADICIONAR</BotaoAcao>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}