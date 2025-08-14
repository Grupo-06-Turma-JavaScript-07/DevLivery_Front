import BotaoGerenciamento from '../../components/botoes/BotaoGerenciamento';
import SidebarFornecedor from '../../components/sidebar/SidebarFornecedor';
import { useAuthContext } from '../../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

function PerfilFornecedor() {
    const { usuario } = useAuthContext();
    const urlFundo = 'https://i.imgur.com/kVokaFs.jpeg';

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${urlFundo}')` }}
        >
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Overlay semi-transparente para dar destaque ao conteúdo */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

            {/* Container do conteúdo principal com z-index para ficar acima do fundo */}
            <div className="relative flex min-h-screen z-20">
                <SidebarFornecedor />

                <main className="flex-1 p-6 md:p-10">
                    {/* Faixa superior elegante com cor da marca e leve sombra */}
                    <section className="relative mb-8 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(800px_300px_at_-10%_-10%,#e7a545,transparent_60%),radial-gradient(700px_300px_at_110%_120%,#7d8d2a,transparent_60%)]" />
                        <div className="relative z-10 rounded-2xl border border-[#ececf0] bg-white/80 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                            <span className="inline-block text-xs font-semibold tracking-wider text-[#6b6b6b] mb-1 uppercase">
                                Painel do Fornecedor
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1f1f1f]">
                                Bem-vindo(a), <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7d8d2a] to-[#e7a545]">
                                    {usuario.nome}
                                </span>!
                            </h1>
                        </div>
                    </section>

                    {/* Cartão central com os botões – foco em simplicidade, sombra suave e bordas grandes */}
                    <section className="mx-auto max-w-3xl">
                        <div className="rounded-2xl border border-[#ececf0] bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                            <div className="h-1.5 w-full bg-gradient-to-r from-[#7d8d2a] to-[#e7a545]" />

                            <div className="p-6 md:p-10 flex flex-col items-center">
                                <p className="text-[#4b4b4b] mb-6">
                                    Acesse as áreas abaixo para gerenciar seu catálogo com facilidade.
                                </p>

                                {/* Container dos botões com respiro */}
                                <div className="flex flex-col items-stretch sm:items-center justify-center gap-6">
                                    <div className="w-full sm:w-[420px] rounded-xl ring-1 ring-[#ececf0] hover:ring-[#7d8d2a]/30 hover:shadow-md transition">
                                        <BotaoGerenciamento to="/categorias/gerenciar" label="Gerenciar Categorias" />
                                    </div>

                                    <div className="w-full sm:w-[420px] rounded-xl ring-1 ring-[#ececf0] hover:ring-[#e7a545]/30 hover:shadow-md transition">
                                        <BotaoGerenciamento to="/produtos/gerenciar" label="Gerenciar Produtos" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Rodapé sutil do painel */}
                    <div className="mt-10 text-center text-xs text-white/70">
                        <span className="px-2 py-1 rounded-full bg-white/30 border border-white/20">
                            DevLivery • Painel do Fornecedor
                        </span>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PerfilFornecedor;