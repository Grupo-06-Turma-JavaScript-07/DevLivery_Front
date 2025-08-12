import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from '@phosphor-icons/react';
import Sidebar from '../../sidebar/Sidebar';
import type Produtos from '../../../models/Produtos';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function DetalheProdutos() {
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produtos>({} as Produtos);

  async function buscarProdutoPorId() {
    try {
      await buscar(`/product/${id}`, setProduto, {});
    } catch (error: any) {
      ToastAlerta('Erro ao buscar o produto.', 'erro');
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId();
    }
  }, [id]);

  return (
    <div className="flex bg-neutral-900 text-white min-h-[85vh]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-yellow-400 font-anton mb-8">
          {produto.category?.category.toUpperCase()} - {produto.name?.toUpperCase()}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna do Vídeo e Checkbox */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                // AQUI ESTÁ A MUDANÇA: Usamos a descrição do produto como a fonte do vídeo
                src={produto.description || ''} 
                title={`Execução do exercício ${produto.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <label className="flex items-center gap-4 p-4 bg-green-700/50 border-2 border-green-500 rounded-lg cursor-pointer hover:bg-green-700/70 transition-colors duration-300">
              <input type="checkbox" className="hidden" />
              <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
                <CheckCircle size={32} weight="fill" className="text-green-400" />
              </div>
              <span className="text-xl font-bold">MARCAR COMO CONCLUÍDO</span>
            </label>
          </div>

          {/* Coluna de Instruções Dinâmicas */}
          <aside className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold uppercase text-yellow-400 font-anton mb-4">
              Execução Detalhada
            </h2>
            <p className="text-amber-100 mb-6">{produto.execution}</p>

            <h2 className="text-2xl font-bold uppercase text-yellow-400 font-anton mb-4">
              Tempo de Pausa
            </h2>
            <p className="text-amber-100">{produto.time}</p>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DetalheProdutos;

function buscar(arg0: string, setProduto: Dispatch<SetStateAction<Produtos>>, arg2: {}) {
  throw new Error('Function not implemented.');
}
