// src/pages/equipe/Equipe.tsx
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"; // Corrigi a importação para ser consistente

// Componente para o Card de cada membro da equipe, para evitar repetição
function CardMembro({ nome, foto, descricao, linkedin, github }: { 
    nome: string, foto: string, descricao: string, linkedin: string, github: string 
}) {
    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full shadow-lg">
                <img src={foto} alt={`Foto de ${nome}`} className="w-full h-full object-cover rounded-full" />
            </div>
            <p className="font-bold text-gray-800 text-lg">{nome}</p>
            <p className="text-gray-600">{descricao}</p>
            <div className="flex gap-4 mt-2">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#7d8d2a] hover:text-[#e7a545] transition-colors">
                    <LinkedinLogo size={32} weight="regular" />
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-[#7d8d2a] hover:text-[#e7a545] transition-colors">
                    <GithubLogo size={32} weight="regular" />
                </a>
            </div>
        </div>
    );
}


function Equipe() {
    // Dados da equipe em um array para deixar o código mais limpo e fácil de manter
    const equipe = [
        { nome: "Juliana Freddi", foto: "https://ik.imagekit.io/pedrolazzz/Juliana_Freddi_2_1.jpg?updatedAt=1754919604935", descricao: "Dev Fullstack que ama debugar", linkedin: "https://www.linkedin.com/in/juliana-freddi/", github: "https://github.com/ddifreju" },
        { nome: "Larissa Santana", foto: "https://ik.imagekit.io/pedrolazzz/Larissa.jpg?updatedAt=1754919604772", descricao: "Dev Fullstack que ama viajar", linkedin: "https://www.linkedin.com/in/larissa-santana-a0b9a02b7/", github: "https://github.com/Santana-larissa" },
        { nome: "Ludmily Oliveira", foto: "https://ik.imagekit.io/pedrolazzz/perfil20quadrado.jpg?updatedAt=1754919604936", descricao: "Dev Fullstack e fitness girl", linkedin: "https://www.linkedin.com/in/ludmily-oliveira/", github: "https://github.com/LudmilyS" },
        { nome: "Matheus Schneider", foto: "https://ik.imagekit.io/pedrolazzz/Untitled-1.png?updatedAt=1754571230256", descricao: "Dev Fullstack que ama girar cubos", linkedin: "https://linkedin.com/in/matheusschneider", github: "https://github.com/matheusschneider1" },
        { nome: "Pedro Elias", foto: "https://ik.imagekit.io/pedrolazzz/Pedro%20Elias%20%20(3).jpg?updatedAt=1754566149442", descricao: "Dev Fullstack que ama pokémon", linkedin: "https://www.linkedin.com/in/pedro-elias-4b5ab4181", github: "https://github.com/pedro-eliasd" }
    ];

    return (
        // A seção agora usa um fundo Cinza Claro (#f0eff2)
        <section className="w-full bg-[#f0eff2] py-20 px-8">
            <div className="container mx-auto">
                {/* O título usa o Verde Oliva (#7d8d2a) */}
                <h2 className="text-4xl font-extrabold text-center text-[#7d8d2a] mb-16">
                    NOSSA EQUIPE
                </h2>
                
                {/* Container para os cards */}
                <div className="flex flex-col items-center gap-y-16">
                    {/* Fileira de cima (3 DEVs) */}
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        {equipe.slice(0, 3).map(membro => <CardMembro key={membro.nome} {...membro} />)}
                    </div>

                    {/* Fileira de baixo (2 DEVs) */}
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        {equipe.slice(3, 5).map(membro => <CardMembro key={membro.nome} {...membro} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Equipe;