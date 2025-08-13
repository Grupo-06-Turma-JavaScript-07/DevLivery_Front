import Sidebar from '../../components/sidebar/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

function Perfil() {
  const { usuario } = useAuthContext();

  return (
    // Fundo da página com o Cinza Claro
    <div className="flex bg-[#f0eff2] min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
            Bem-vindo(a), {usuario.nome}!
        </h1>

        {/* Aqui entrarão os outros componentes, como "Últimas Compras" e "Promoções" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Espaço reservado para as Últimas Compras */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Últimas Compras</h2>
                <p className="text-gray-500">Em breve, seus pedidos recentes aparecerão aqui.</p>
            </div>

            {/* Espaço reservado para as Promoções */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Minhas Promoções</h2>
                <p className="text-gray-500">Em breve, promoções exclusivas para você.</p>
            </div>
            
        </div>
      </main>
    </div>
  );
}

export default Perfil;