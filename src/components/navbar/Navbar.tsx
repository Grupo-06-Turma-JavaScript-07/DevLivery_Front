// src/components/navbar/Navbar.tsx
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuthContext } from "../../contexts/AuthContext";
import { ShoppingCart } from "phosphor-react";
import { useCart } from "../../contexts/CartContext";

function Navbar() {
  const { usuario, handleLogout, userRole } = useAuthContext();
  const { quantidadeItens } = useCart();

  // Função simples para rolar a tela para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Para uma rolagem suave
    });
  };

  const navLinks = usuario.id ? (
    <ul className="flex items-center gap-6 font-semibold text-sm">
      {/* ADICIONE O onClick AQUI */}
      <li><RouterLink to="/home" onClick={scrollToTop} className="hover:text-[#7d8d2a]">Home</RouterLink></li>
      
      {userRole === 'user' ? (
        <>
          <li><RouterLink to="/perfil" className="hover:text-[#7d8d2a]">Meu Perfil</RouterLink></li>
          <li>
            <RouterLink to="/carrinho" className="flex items-center gap-1 hover:text-[#7d8d2a] relative">
              <ShoppingCart size={24} />
              {quantidadeItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {quantidadeItens}
                </span>
              )}
            </RouterLink>
          </li>
        </>
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
    <ul className="flex items-center gap-6 font-semibold text-sm">
      {/* E ADICIONE O onClick AQUI */}
      <li><RouterLink to='/home' onClick={scrollToTop} className="hover:text-[#7d8d2a] cursor-pointer">Home</RouterLink></li>
      <li>
        <ScrollLink to='produtos' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-[#7d8d2a] cursor-pointer">
          Produtos
        </ScrollLink>
      </li>
      <li>
        <ScrollLink to='sobrenos' spy={true} smooth={true} offset={-70} duration={500} className="hover:text-[#7d8d2a] cursor-pointer">
          Sobre Nós
        </ScrollLink>
      </li>
      <li><RouterLink to='/login' className="px-4 py-2 rounded-full bg-white border border-[#ececf0] shadow-sm hover:bg-[#f1f1f3]">Login</RouterLink></li>
      <li><RouterLink to='/cadastro' className="bg-[#7d8d2a] text-white px-4 py-2 rounded-full hover:brightness-110 transition-all">Cadastre-se</RouterLink></li>
    </ul>
  );

  return (
    <div className="w-full bg-[#f0eff2] text-[#1a1a1a] sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* E ADICIONE O onClick AQUI TAMBÉM */}
        <RouterLink to="/home" onClick={scrollToTop} className="flex items-center gap-2">
          <img className="w-12 h-9" src="https://ik.imagekit.io/pedrolazzz/Co%CC%81pia-de-HUBfitHUB-1.png?updatedAt=1755131403313"
            alt="Logo" />
        </RouterLink>
        {navLinks}
      </div>
    </div>
  );
}

export default Navbar;