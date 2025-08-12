import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardCategoria from '../../components/categoria/cardcategoria/CardCategoria';
import Sidebar from '../../components/sidebar/Sidebar';
import type Categoria from '../../models/Categoria';

import { ToastAlerta } from '../../utils/ToastAlerta';
import { buscar } from '../../service/Service';

function CategoriasUsuario() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Função para buscar as categorias no back-end
  async function buscarCategorias() {
    try {
      await buscar('/category', setCategorias, {});
    } catch (error: any) {
      ToastAlerta('Erro ao buscar as categorias.', 'erro');
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <div className="flex bg-neutral-900 text-white min-h-[85vh]">
      <Sidebar />

      <main className="flex-1 p-8 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold text-yellow-400 font-anton mb-8">
            ESCOLHA O TREINO
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {Array.isArray(categorias) && categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>

        <aside className="col-span-1 bg-neutral-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold uppercase text-yellow-400 font-anton mb-6">
            Lista de treino
          </h2>
          <ul className="space-y-4">

            {Array.isArray(categorias) && categorias.map((categoria) => (
              <li key={categoria.id} className="text-amber-100 hover:text-yellow-400 cursor-pointer">
                <Link to={`/produtos/categoria/${categoria.id}`}>{categoria.category}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default CategoriasUsuario;


// import { Link } from 'react-router-dom';
// import CardCategoria from '../../components/categoria/cardcategoria/CardCategoria';
// import Sidebar from '../../components/sidebar/Sidebar';

// function CategoriasUsuario() {
//   // Usamos dados estáticos para as categorias.
//   const mockCategorias = [
//     { id: 1, nome: 'Superiores' },
//     { id: 2, nome: 'Inferiores' },
//     { id: 3, nome: 'Funcional' },
//     { id: 4, nome: 'Livre' },
//   ];

//   return (
//     <div className="flex bg-neutral-900 text-white min-h-[85vh]">
//       <Sidebar />

//       <main className="flex-1 p-8 grid grid-cols-3 gap-8">
//         {/* Área principal com os Cards - Ocupa 2 de 3 colunas */}
//         <div className="col-span-2">
//           <h1 className="text-4xl font-bold text-yellow-400 font-anton mb-8">
//             ESCOLHA A CATEGORIA
//           </h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* O .map cria um Card para cada item da nossa lista */}
//             {mockCategorias.map((categoria) => (
//               <CardCategoria key={categoria.id} categoria={categoria} />
//             ))}
//           </div>
//         </div>

//         {/* Sidebar da Direita com a lista de categorias */}
//         <aside className="col-span-1 bg-neutral-800 p-6 rounded-lg">
//           <h2 className="text-2xl font-bold uppercase text-yellow-400 font-anton mb-6">
//             Lista de Categorias
//           </h2>
//           <ul className="space-y-4">
//             {mockCategorias.map((categoria) => (
//               <li key={categoria.id} className="text-amber-100 hover:text-yellow-400 cursor-pointer">
//                 {/* O Link aqui também leva para a lista de produtos daquela categoria */}
//                 <Link to={`/produtos/categoria/${categoria.id}`}>{categoria.nome}</Link>
//               </li>
//             ))}
//           </ul>
//         </aside>
//       </main>
//     </div>
//   );
// }

// export default CategoriasUsuario;