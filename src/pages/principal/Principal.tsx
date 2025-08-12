import { Link } from "react-scroll";

function Principal() {
    return (

        <>
            {/* // PÁGINA DO HOME */}

            {/* 'relative' para ancorar a onda e 'pb-20' (padding-bottom) para criar espaço para ela */}
            {/* Tinha que mudar para class name */}
            <div className="home min-h-screen"> 

                <div className="w-full text-slate-800 relative pb-20 min-h-screen flex flex-col">
                    <div className="container mx-auto flex flex-col justify-center items-center pt-65 flex-grow">
                        {/* Coluna do texto */}
                        <div className="flex flex-col justify-center items-center text-center gap-y-6 ">
                            <h2 className="text-6xl text-white font-bold font-anton [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">ONDE A SUA ROTINA FAZ PUSH <br />E SEU CORPO DÁ PULL</h2>
                            <div className="flex justify-center">
                                <Link
                                    to='produtos'
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    className="cursor-pointer hover:bg-transparent hover:border-2 hover:border-yellow-400 bg-yellow-400 border-[#f9ef23 text-black hover:text-yellow-400 font-bold py-2 px-4 rounded shadow-lg shadow-black/50"
                                >
                                    INSCREVA-SE HOJE!
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                    {/* código da onda no final do container pai */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg
                            className="relative block w-full h-[75px] rotate-180" // Controle a altura da onda aqui
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
                </div>
            </div>
        </>
    )
}

export default Principal;