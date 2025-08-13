
import { Link } from 'react-router-dom';
import { House, Tag, Package } from '@phosphor-icons/react';
import { useAuthContext } from '../../contexts/AuthContext'; 

function SidebarFornecedor() {
  const { usuario } = useAuthContext();

  return (
    <aside className="w-64 bg-[#7d8d2a] text-white flex flex-col p-4 rounded-r-2xl shadow-lg">
      <div className="flex flex-col items-center text-center mb-8 border-b border-white/20 pb-6">
        <img 
          src={usuario.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"} 
          alt="Foto do fornecedor" 
          className="w-24 h-24 rounded-full border-4 border-white object-cover" 
        />
        <h3 className="mt-4 font-bold text-lg">{usuario.nome?.split(' ')[0].toUpperCase()}</h3>
      </div>

      <nav className="flex flex-col gap-4 text-lg">
        <Link to="/perfilfornecedor" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors bg-white/10 font-bold">
            <House size={24} />
            Painel
        </Link>
        <Link to="/categorias/gerenciar" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
            <Tag size={24} />
            Categorias
        </Link>
        <Link to="/produtos/gerenciar" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
            <Package size={24} />
            Produtos
        </Link>
      </nav>

      <div className="mt-auto text-center p-4">
        <span className="font-extrabold text-2xl tracking-wide">DEVLIVERY</span>
      </div>
    </aside>
  );
}

export default SidebarFornecedor;