// src/components/navbar/Navbar.tsx
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
// Lembre-se de ajustar o caminho para o seu AppContext, se necessário
import { useAuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { usuario, handleLogout, userRole } = useAuthContext();

  // Lógica para decidir quais links serão exibidos
  const navLinks = usuario.id ? (
    // Se o usuário está logado
    <ul className="flex items-center gap-6 font-semibold text-sm">
      <li><RouterLink to="/home" className="hover:text-[#7d8d2a]">Home</RouterLink></li>
      {userRole === 'user' ? (
        <li><RouterLink to="/perfil" className="hover:text-[#7d8d2a]">Meu Perfil</RouterLink></li>
      ) : (
        <li><RouterLink to="/perfilfornecedor" className="hover:text-[#7d8d2a]">Painel do Fornecedor</RouterLink></li>
      )}
      <li>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
          Sair
        </button>
      </li>
    </ul>
  ) : (
    // Se o usuário não está logado 
    <ul className="flex items-center gap-6 font-semibold text-sm">
      <li><RouterLink to='/home' className="hover:text-[#7d8d2a] cursor-pointer">Home</RouterLink></li>

      {/* Links de rolagem para as seções da página principal */}
      <li>
        <ScrollLink to='cardapio' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-[#7d8d2a] cursor-pointer">
          Cardápio
        </ScrollLink>
      </li>
      <li>
        <ScrollLink to='sobrenos' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-[#7d8d2a] cursor-pointer">
          Sobre Nós
        </ScrollLink>
      </li>

      {/* Links de navegação para outras páginas */}
      <li><RouterLink to='/login' className="px-4 py-2 rounded-full bg-white border border-[#ececf0] shadow-sm hover:bg-[#f1f1f3]">Login</RouterLink></li>
      <li><RouterLink to='/cadastro' className="bg-[#7d8d2a] text-white px-4 py-2 rounded-full hover:brightness-110 transition-all">Cadastre-se</RouterLink></li>
    </ul>
  );

  return (
    // Navbar com o novo tema de cores do DEVLIVERY
    <div className="w-full bg-[#f0eff2] text-[#1a1a1a] sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <RouterLink to="/home" className="flex items-center gap-2">
            {/* Logo do DEVLIVERY */}
            <div className="w-8 h-8 rounded-full bg-[#e7a545] grid place-items-center font-black text-white">D</div>
            <span className="font-extrabold tracking-wide">DEVLIVERY</span>
        </RouterLink>
        
        {/* Renderiza os links corretos com base no estado do usuário */}
        {navLinks}
      </div>
    </div>
  );
}

export default Navbar;