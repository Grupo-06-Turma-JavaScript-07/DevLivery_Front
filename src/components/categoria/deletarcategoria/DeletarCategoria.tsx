import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';
import { buscar, deletar } from '../../../service/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { useAuthContext } from '../../../contexts/AuthContext';

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const { usuario } = useAuthContext();
  const token = usuario.token;

  // Função para buscar os dados da categoria específica pelo ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/Category/${id}`, setCategoria, { // Rota corrigida para /Category
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      ToastAlerta('Erro ao buscar categoria. Pode ser que a categoria não exista.', 'erro');
      navigate('/categorias/gerenciar'); // Adicionado redirecionamento em caso de erro na busca
    }
  }

  // O useEffect busca os dados da categoria assim que a página é carregada
  useEffect(() => {
    if (id !== undefined && token !== '') {
      buscarPorId(id);
    } else {
      // Redireciona caso o token não exista
      navigate('/login');
    }
  }, [id, token]);

  // Função que será chamada pelo clique no botão de confirmar
  async function deletarCategoria() {
    try {
      await deletar(`/Category/${id}`, { // Rota corrigida para /Category
        headers: {
          Authorization: token,
        },
      });
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
    <div className="flex items-center justify-center bg-[#f1f1f3] text-black min-h-[85vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Tem certeza que deseja deletar a categoria?</h1>
        
        <p className="text-4xl font-bold text-[#7d8d2a] font-anton mb-8">
          {categoria.categoria}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={retornar}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Não
          </button>
          <button
            onClick={deletarCategoria}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Sim, deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;