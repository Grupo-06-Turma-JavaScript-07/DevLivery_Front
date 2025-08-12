import Sidebar from "../../components/sidebar/Sidebar";
import { useAppContext } from "../../contexts/AuthContext";
function Perfil() {
  
  const { usuario } = useAppContext();

  console.log('Este é o objeto USUÁRIO que o Perfil está recebendo:', usuario);

  return (
    <div className="flex bg-neutral-900 text-white min-h-[85vh]">
      <Sidebar />
      <main className="flex-1 p-8">
      
        <h1 className="text-4xl font-bold text-yellow-400 font-anton">
            BEM VINDO, {usuario.nome?.toUpperCase()}!
        </h1>
        <p className="text-amber-100 mb-8">Acompanhe aqui sua evolução e seu progresso.</p>
         <Dashboard usuario={usuario} />
      </main>
    </div>
  );
}

export default Perfil;