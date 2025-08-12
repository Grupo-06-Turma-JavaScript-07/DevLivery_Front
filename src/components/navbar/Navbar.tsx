import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAppContext } from "../../contexts/AuthContext";

function Navbar() {
  const { usuario, handleLogout, userRole } = useAppContext();

  // Lógica para decidir quais links serão exibidos
  const navLinks = usuario.id ? (
    // Se o usuário está logado
    <ul className="flex items-center gap-6 font-bold uppercase">
      <li><RouterLink to="/home" className="hover:text-yellow-400">Home</RouterLink></li>
      {userRole === 'user' ? (
        <li><RouterLink to="/perfil" className="hover:text-yellow-400">Meu Perfil</RouterLink></li>
      ) : (
        <li><RouterLink to="/perfilpersonal" className="hover:text-yellow-400">Painel do Personal</RouterLink></li>
      )}
      <li>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Sair
        </button>
      </li>
    </ul>
  ) : (
    // Se o usuário não está logado 
    <ul className="flex items-center gap-6 font-bold uppercase">
      <li><RouterLink to='/home' className="hover:text-yellow-400 cursor-pointer">Home</RouterLink></li>

      {/* Estes são links de rolagem */}
      <li>
        <ScrollLink to='produtos' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-yellow-400 cursor-pointer">
          Produtos
        </ScrollLink>
      </li>
      <li>
        <ScrollLink to='sobrenos' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-yellow-400 cursor-pointer">
          Sobre Nós
        </ScrollLink>
      </li>

      {/* Estes são links de navegação */}
      <li><RouterLink to='/login' className="hover:text-yellow-400">Login</RouterLink></li>
      <li><RouterLink to='/cadastro' className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">Cadastre-se</RouterLink></li>
    </ul>
  );

  return (
    <div className="w-full bg-neutral-900 p-4 text-amber-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <RouterLink to="/home">
          <img src="https://ik.imagekit.io/pedrolazzz/IMG_2173.PNG?updatedAt=1754693890147" alt="Logo FitHub" className="w-10 h-10" />
        </RouterLink>
        {navLinks}
      </div>
    </div>
  );
}

export default Navbar;