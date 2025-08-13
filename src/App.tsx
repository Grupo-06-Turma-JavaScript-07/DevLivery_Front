import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Perfil from "./pages/perfil/Perfil";




function App() {
  return (
    <>
      <ToastContainer />
      {/* O BrowserRouter deve ser o componente mais externo para prover o contexto de rotas */}
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
             
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} /> 

              <Route path="/perfil" element={<Perfil />} />
              
              
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;