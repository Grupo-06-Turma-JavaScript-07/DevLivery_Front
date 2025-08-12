// import { Link } from "react-scroll";

function SobreNos() {
    return (
        <>
            {/* Container para o texto SOBRE A EMPRESA */}

            {/* Container Principal com fundo escuro e texto claro */}
            <section className="flex flex-col md:flex-row items-center justify-center gap-12 w-full bg-neutral-800 text-amber-100 px-8 py-16 relative pb-40">

                {/* Coluna do texto (metade da tela em desktops) */}
                <div className="md:w-1/3 flex flex-col gap-4">

                    {/* Título estilizado */}
                    <h2 className="text-4xl lg:text-5xl font-bold uppercase text-yellow-400 font-anton">
                        Sobre a Nossa Empresa
                    </h2>

                    {/* Parágrafos */}
                    <p className="text-lg " >
                        O FitHub é um aplicativo fitness criado para ajudar os usuários a alcançarem seus objetivos de saúde e bem-estar.
                    </p>
                    <p className="text-lg">
                        Com uma interface intuitiva, a plataforma possibilita monitorar treinos, calcular o IMC com base em altura e peso, além de gerenciar cadastros de usuários, treinos e categorias.
                    </p>
                    <p className="text-lg">
                        O objetivo é oferecer uma experiência personalizada e prática, incentivando hábitos saudáveis no dia a dia.
                    </p>
                </div>

                {/* Coluna das Imagens (metade da tela em desktops) */}
                <div className="md:w-1/2 flex flex-col items-center justify-center gap-8">

                    {/* Imagem 1 */}
                    <img
                        src="https://ik.imagekit.io/pedrolazzz/vinicius.jpg?updatedAt=1754920553785"
                        alt="Homem treinando com peso"
                        className="w-80 h-56 object-cover rounded-lg sombra transform -translate-x-12"
                    />

                    {/* Imagem 2 */}
                    <img
                        src="https://i.imgur.com/tlGVPm3.jpeg"
                        alt="homem treinando com corda naval"
                        className="w-80 h-56 object-cover rounded-lg transform translate-x-12 sombra"

                    />



                </div>

                {/* ONDA DECORATIVA PARA O RODAPÉ */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg
                        className="relative block w-full h-[75px] rotate-180" // altura da onda
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                     
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="fill-neutral-900"
                        ></path>
                    </svg>
                </div>
            </section>

            

            

        </>

    )
}

export default SobreNos;