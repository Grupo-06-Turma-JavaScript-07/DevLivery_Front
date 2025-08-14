// src/components/sidebar_usuario/SidebarUsuario.tsx
import { Link } from 'react-router-dom';
import { House, User, MapPin } from '@phosphor-icons/react';
// Lembre-se de ajustar o caminho para o seu useAuth, se necessário
import { useAuthContext } from '../../contexts/AuthContext'; 

function Sidebar() {
  const { usuario } = useAuthContext();

  return (
    // Sidebar com a cor Verde Oliva
    <aside className="w-64 bg-[#7d8d2a] text-white flex flex-col p-4 rounded-r-2xl shadow-lg">
      <div className="flex flex-col items-center text-center mb-8 border-b border-white/20 pb-6">
        <img 
          src={usuario.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"} 
          alt="Foto do usuário" 
          className="w-24 h-24 rounded-full border-4 border-white object-cover" 
        />
        {/* Exibe apenas o primeiro nome do usuário para não quebrar o layout */}
        <h3 className="mt-4 font-bold text-lg">PERFIL DE {usuario.nome?.split(' ')[0].toUpperCase()}</h3>
      </div>

      <nav className="flex flex-col gap-4 text-lg">
        <Link to="/home" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
            <House size={24} />
            Home
        </Link>
        <Link to="/recomendacoes" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
            <MapPin size={24} />
            Minhas Recomendações
        </Link>
        {/* O link ativo tem um fundo sutilmente diferente */}
        <Link to="/perfil" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors bg-white/10 font-bold">
            <User size={24} />
            Meu Perfil
        </Link>
        <Link to="/enderecos" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
            <MapPin size={24} />
            Meus Endereços
        </Link>
      </nav>

      <div className="mt-auto text-center p-4">
        {/* Logo do DEVLIVERY */}
        <span className="font-extrabold text-2xl tracking-wide">DEVLIVERY</span>
      </div>
    </aside>
  );
}

export default Sidebar;