import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';
import { buscar, deletar } from '../../../service/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  // Função para buscar os dados da categoria específica pelo ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/category/${id}`, setCategoria, {});
    } catch (error: any) {
      ToastAlerta('Erro ao buscar categoria.', 'erro');
    }
  }

  // O useEffect busca os dados da categoria assim que a página é carregada
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Função que será chamada pelo clique no botão de confirmar
  async function deletarCategoria() {
    try {
      await deletar(`/category/${id}`, {});
      ToastAlerta('Categoria deletada com sucesso!', 'sucesso');
    } catch (error) {
      ToastAlerta('Erro ao deletar categoria.', 'erro');
    }
    retornar();
  }

  function retornar() {
    navigate('/categorias/gerenciar');
  }

  return (
    <div className="flex items-center justify-center bg-neutral-900 text-white min-h-[85vh]">
      <div className="bg-neutral-800 p-8 rounded-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Tem certeza que deseja deletar a categoria?</h1>
        {/* Exibe o nome da categoria que foi buscada da API */}
        <p className="text-4xl font-bold text-yellow-400 font-anton mb-8">
          {categoria.category}
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={retornar}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded">
            Não
          </button>
          <button onClick={deletarCategoria}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded">
            Sim, deletar
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarCategoria;