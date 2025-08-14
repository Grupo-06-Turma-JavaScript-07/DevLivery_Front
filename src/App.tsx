import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Perfil from "./pages/perfil/Perfil";
import PerfilFornecedor from "./pages/perfil/PerfilFornecedor";
import CategoriasUsuario from "./pages/categorias/CategoriasUsuario";
import DetalheProdutos from "./components/produtos/detalheprodutos/DetalheProdutos";
import ListarCategorias from "./components/categoria/listacategorias/ListaCategorias";
import FormularioCategoria from "./components/categoria/formulariocategoria/Formulariocategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormularioProduto from "./components/produtos/formularioprodutos/FormularioProdutos";
import DeletarProdutos from "./components/produtos/deletarprodutos/DeletarProdutos";
// import CardRecomendados from "./components/produtos/cardprodutos/CardRecomendados";
import Produtos from "./pages/produtos/Produtos";
import GerenciarProduto from "./components/produtos/gerenciarprodutos/GerenciarProduto";
import Cardapio from "./pages/cardapio/Cardapio";
import { CartProvider } from "./contexts/CartContext";
import Carrinho from "./pages/carrinho/Carrinho";


function App() {
  return (
    <>      
      {/* O BrowserRouter deve ser o componente mais externo para prover o contexto de rotas */}
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ToastContainer />
            <Navbar />
            <div className="min-h-[80vh]">
              <Routes>

                {/* --- Rotas Públicas e de Autenticação --- */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />


                {/* --- Rotas do Usuário Comum --- */}
                <Route path="/home" element={<Home />} />

                <Route path="/perfil" element={<Perfil />} />
                <Route path="/categorias" element={<CategoriasUsuario />} />
                {/* <Route path="/produtos/categoria/:id" element={<ProdutosUsuario />} /> */}
                <Route path="/produtos/:id" element={<DetalheProdutos />} />

                {/* --- Rotas do Personal Trainer (Gerenciamento) --- */}
                <Route path="/perfilfornecedor" element={<PerfilFornecedor />} />

                {/* Gerenciamento de Categorias */}
                <Route path="/categorias/gerenciar" element={<ListarCategorias />} />
                <Route path="/cadastrarcategoria" element={<FormularioCategoria />} />
                <Route path="/editarcategoria/:id" element={<FormularioCategoria />} />
                <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

                {/* Gerenciamento de Produtos */}
                <Route path="/produtos/gerenciar" element={<GerenciarProduto />} />
                <Route path="/cadastrarproduto" element={<FormularioProduto />} />
                <Route path="/editarproduto/:id" element={<FormularioProduto />} />
                <Route path="/deletarproduto/:id" element={<DeletarProdutos />} />
                <Route path="/cardrecomendados/:id" element={<Produtos />} />
                <Route path="/cardapio" element={<Cardapio />} />
                <Route path="/carrinho" element={<Carrinho />} />


              </Routes>
            </div>
            <Footer />
          </CartProvider >
        </AuthProvider >
      </BrowserRouter>

    </>
  );
}

export default App;




