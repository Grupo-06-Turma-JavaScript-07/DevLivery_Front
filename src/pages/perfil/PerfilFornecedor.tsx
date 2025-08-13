import BotaoGerenciamento from '../../components/botoes/BotaoGerenciamento';
import SidebarFornecedor from '../../components/sidebar/SidebarFornecedor';
import { useAuthContext } from '../../contexts/AuthContext';

function PerfilFornecedor() {
  const { usuario } = useAuthContext();

  return (
    // Fundo da página com o Cinza Claro
    <div className="flex bg-[#f0eff2] min-h-screen">
      <SidebarFornecedor />
      
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
            Bem-vindo(a), {usuario.nome}!
        </h1>

        <div className="flex flex-col items-center justify-center gap-10 mt-16">
          <BotaoGerenciamento to="/categorias/gerenciar" label="Gerenciar Categorias" />
          <BotaoGerenciamento to="/produtos/gerenciar" label="Gerenciar Produtos" />
        </div>

       
      </main>
    </div>
  );
}

export default PerfilFornecedor;