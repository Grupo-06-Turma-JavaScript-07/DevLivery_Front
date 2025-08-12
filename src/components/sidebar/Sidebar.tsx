import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AuthContext';

function Sidebar() {
  const { usuario } = useAppContext();

  return (
    <aside className="w-64 bg-neutral-800 text-white flex flex-col p-4 shadow-lg">
      <div className="flex flex-col items-center mb-8">
        {/*A imagem usa a foto do usuário, com uma imagem padrão de reserva */}
        <img 
          src={usuario.foto || "https://ik.imagekit.io/pedrolazzz/fitness-teamwork-concept-with-elderly-couple_23-2147776970.jpg?updatedAt=1754920024601 "} 
          alt="Foto do usuário" 
          className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover" 
        />
       
        <h3 className="mt-4 font-bold text-lg">{usuario.nome}</h3>
      </div>

      <nav className="flex flex-col gap-4 text-lg">
        <Link to="/home" className="px-2 py-1 rounded hover:bg-neutral-700 transition-colors">Home</Link>
        <Link to="/perfil" className="px-2 py-1 rounded hover:bg-neutral-700 transition-colors">Meu Perfil</Link>
        <Link to="/categorias" className="px-2 py-1 rounded hover:bg-neutral-700 transition-colors">
            Meus Treinos
        </Link>
      </nav>

      <div className="mt-auto flex justify-center p-4">
        <img 
            src="https://ik.imagekit.io/pedrolazzz/IMG_2173.PNG?updatedAt=1754693890147"
            alt="Logo FitHub"
            className="w-16"
        />
      </div>
    </aside>
  );
}

export default Sidebar;