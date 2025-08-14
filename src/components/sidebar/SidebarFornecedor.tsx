import { Link } from 'react-router-dom';
import { House, Tag, Package, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';

function SidebarFornecedor() {
    const { usuario } = useAuthContext();
    const [oculto, setOculto] = useState(false);

    return (
        <aside
            className={`relative h-screen bg-lime-800 text-white flex flex-col p-4 shadow-lg transition-all duration-300 ${
                oculto ? 'w-20' : 'w-64'
            }`}
            style={{
                backgroundColor: '#7d8d2a',
            }}
        >
            {/* Botão para ocultar/mostrar */}
            <button
                className="absolute top-4 right-[-12px] bg-[#d9d3d3] text-black p-1.5 rounded-full shadow-md hover:brightness-90 transition z-50"
                onClick={() => setOculto(!oculto)}
            >
                {oculto ? <CaretRight size={20} /> : <CaretLeft size={20} />}
            </button>

            {!oculto && (
                <>
                    <div className="flex flex-col items-center text-center mb-8 border-b border-white/20 pb-6">
                        <img
                            src={usuario.foto || 'https://ik.imagekit.io/2zvbvzaqt/usuario.png'}
                            alt="Foto do fornecedor"
                            className="w-24 h-24 rounded-full border-4 border-white object-cover"
                        />
                        <h3 className="mt-4 font-bold text-lg">
                            {usuario.nome?.split(' ')[0].toUpperCase()}
                        </h3>
                    </div>

                    <nav className="flex flex-col gap-4 text-lg">
                        {/* Painel */}
                        <Link
                            to="/perfilfornecedor"
                            className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors bg-white/10 font-bold"
                        >
                            <House size={24} />
                            Painel
                        </Link>

                        {/* Gerenciar Categorias */}
                        <Link
                            to="/categorias/gerenciar"
                            className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors"
                        >
                            <Tag size={24} />
                            Categorias
                        </Link>

                        {/* Gerenciar Produtos */}
                        <Link
                            to="/produtos/gerenciar"
                            className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/20 transition-colors"
                        >
                            <Package size={24} />
                            Produtos
                        </Link>
                    </nav>

                    <div className="mt-auto text-center p-4">
                        <span className="font-extrabold text-2xl tracking-wide">
                            DEVLIVERY
                        </span>
                    </div>
                </>
            )}
        </aside>
    );
}

export default SidebarFornecedor;