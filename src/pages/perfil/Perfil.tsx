// src/pages/perfil/Perfil.tsx

import ListarProdutos from '../../components/produtos/listarprodutos/ListarProdutos';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Perfil() {
    const { usuario } = useAuthContext();
    const urlFundo = 'https://i.imgur.com/kVokaFs.jpeg';

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${urlFundo}')` }}
        >
            {/* Overlay semi-transparente para dar destaque ao conteúdo */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

            {/* Container do conteúdo principal com z-index para ficar acima do fundo */}
            <div className="relative flex min-h-screen z-20">
                <Sidebar />

                <main className="flex-1 p-8">
                    <h1 className="text-4xl font-extrabold text-white mb-8">
                        Bem-vindo(a), {usuario.nome}!
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-8">
                        <div className="bg-white/80 p-6 rounded-lg shadow backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Últimas Compras</h2>
                            <p className="text-gray-500">Em breve, seus pedidos recentes aparecerão aqui.</p>
                        </div>

                        <div className="bg-white/80 p-6 rounded-lg shadow backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Minhas Promoções</h2>
                            <p className="text-gray-500">Em breve, promoções exclusivas para você.</p>
                        </div>
                    </div>

                    <div className="relative bg-white/80 p-6 rounded-lg shadow backdrop-blur-md">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-700">Pratos e Cores</h2>
                                <p className="text-gray-500">Sua próxima refeição favorita está aqui 🍽️</p>
                            </div>
                            <Link to="/cardapio" className="bg-[#7d8d2a] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6b7b25] transition-colors">
                                Ver cardápio
                            </Link>
                        </div>
                        
                        <ListarProdutos />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Perfil;