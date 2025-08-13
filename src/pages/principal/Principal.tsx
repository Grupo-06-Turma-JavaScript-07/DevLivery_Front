// src/pages/principal/Principal.tsx
import BotaoAcao from '../../components/botaoacao/BotaoAcao';

export default function Principal() {
    return (
        <section className="relative bg-[#f0eff2] text-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 py-3 grid lg:grid-cols-2 gap-10 items-center">
                {/* Imagem principal */}
                <div className="relative order-2 lg:order-1">
                    <div className="relative w-full max-w-lg mx-auto">
                        <img
                            src="https://ik.imagekit.io/qvv2cbqgy/Post%20Prato%20de%20Comida%20Chique%20Verde%20Escuro%20e%20Cinza.png?updatedAt=1755092122550"
                            alt="Foto prato"
                            className="rounded-full max-w-2xl -ml-12"
                        />
                    </div>
                </div>

                {/* Texto */}
                <div className="order-1 lg:order-2">
                    <p className="text-xl italic text-[#6b6b6b]">Saudável & Saboroso</p>
                    <h1 className="text-5xl md:text-6xl font-black leading-tight">Delivery Saudável</h1>
                    <p className="mt-4 text-[#4b4b4b] max-w-xl">
                        Ingredientes frescos e selecionados, preparados com cuidado para uma refeição deliciosa e nutritiva, entregue na sua porta.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <BotaoAcao>FAÇA SEU PEDIDO</BotaoAcao>
                        <BotaoAcao variant="ghost">VEJA O CARDÁPIO</BotaoAcao>
                    </div>
                </div>
            </div>

            {/* Separador de onda */}
            <svg className="w-full text-white rotate-180" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
                <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,96C384,107,480,117,576,106.7C672,96,768,64,864,48C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
        </section>
    );
}