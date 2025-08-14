// src/components/sidebar_usuario/SidebarUsuario.tsx
import { Link } from 'react-router-dom';
import { House, User, MapPin, Sparkle, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';

function SidebarUsuario() {
  const { usuario } = useAuthContext();
  const [oculto, setOculto] = useState(false);

  return (
    <aside
        className={`relative h-screen bg-[#7d8d2a] text-white flex flex-col p-4 shadow-lg transition-all duration-300 ${
            oculto ? 'w-20 items-center' : 'w-64'
        }`}
    >
        {/* Botão para ocultar/mostrar */}
        <button
            className="absolute top-6 right-[-12px] bg-white text-[#7d8d2a] p-1 rounded-full shadow-md hover:bg-gray-100 transition z-10"
            onClick={() => setOculto(!oculto)}
        >
            {oculto ? <CaretRight size={16} /> : <CaretLeft size={16} />}
        </button>

        {/* Logo e Nome */}
        <div className="flex flex-col items-center text-center mb-8 border-b border-white/20 pb-6 w-full">
            <img
                src={usuario.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"}
                alt="Foto do usuário"
                className={`rounded-full border-4 border-white object-cover transition-all duration-300 ${
                    oculto ? 'w-12 h-12' : 'w-24 h-24'
                }`}
            />
            <h3 className={`mt-4 font-bold text-lg transition-opacity duration-300 ${
                oculto ? 'opacity-0 h-0' : 'opacity-100'
            }`}>
                PERFIL DE {usuario.nome?.split(' ')[0].toUpperCase()}
            </h3>
        </div>

        {/* Navegação */}
        <nav className={`flex flex-col gap-4 text-lg ${oculto ? 'items-center' : ''}`}>
            <Link to="/home" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
                <House size={24} />
                <span className={oculto ? 'hidden' : ''}>Home</span>
            </Link>
            <Link to="/perfil" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
                <User size={24} />
                <span className={oculto ? 'hidden' : ''}>Meu Perfil</span>
            </Link>
            <Link to="/cardapio" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
                <MapPin size={24} />
                <span className={oculto ? 'hidden' : ''}>Cardápio</span>
            </Link>
            <Link to="/cardapio?view=recomendados" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors">
                <Sparkle size={24} />
                <span className={oculto ? 'hidden' : ''}>Recomendações</span>
            </Link>
        </nav>

        {/* Logo Fixo no Final */}
        <div className="mt-auto text-center p-4">
            <span className={`font-extrabold text-2xl tracking-wide transition-opacity duration-300 ${
                oculto ? 'opacity-0' : 'opacity-100'
            }`}>
                DEVLIVERY
            </span>
        </div>
    </aside>
  );
}

export default SidebarUsuario;