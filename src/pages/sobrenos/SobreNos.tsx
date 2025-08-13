// src/pages/sobre/Sobre.tsx

// Componente recriado para a seção "Sobre" do DEVLIVERY
function SobreNos() {
    return (
        // A seção agora usa o fundo branco (#ffffff)
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 w-full bg-white text-[#1a1a1a] px-8 py-24">

            {/* Coluna das Imagens */}
            <div className="md:w-1/2 flex flex-col items-center justify-center gap-8">
                {/* Imagens que representam comida saudável e delivery */}
                <img
                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop"
                    alt="Prato de salada saudável"
                    className="w-80 h-56 object-cover rounded-lg shadow-xl transform -translate-x-12"
                />
                <img
                    src="https://images.unsplash.com/photo-1594503924373-7a0547043813?q=80&w=600&auto=format&fit=crop"
                    alt="Embalagem de delivery"
                    className="w-80 h-56 object-cover rounded-lg shadow-xl transform translate-x-12"
                />
            </div>

            {/* Coluna do texto */}
            <div className="md:w-1/3 flex flex-col gap-4">
                
                {/* Título com a cor Verde Oliva */}
                <h2 className="text-4xl lg:text-5xl font-extrabold uppercase text-[#7d8d2a]">
                    Sobre o DEVLIVERY
                </h2>

                {/* Parágrafos com o novo texto sobre o projeto */}
                <p className="text-lg text-gray-600">
                    É uma plataforma de comida saudável, desenvolvida com foco em praticidade, organização e bem-estar.
                </p>
                <p className="text-lg text-gray-600">
                    Para os fornecedores, é possível cadastrar alimentos com preço, descrição e a data de validade, além de associá-los a uma categoria.
                </p>
                <p className="text-lg text-gray-600">
                    Para os usuários, é possível visualizar todos produtos, pesquisá-los por nome ou até mesmo por categoria, além da recomendação personalizada do próprio sistema.
                </p>
            </div>

        </section>
    );
}

export default SobreNos;