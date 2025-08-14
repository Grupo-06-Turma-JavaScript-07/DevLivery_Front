import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
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
    <div className="flex bg-[#7d8d2a] text-white min-h-[85vh]">
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-[#7d8d2a] font-anton mb-8">
          {produto.category?.categoria.toUpperCase()} - {produto.nameProduct?.toUpperCase()}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna QUE FICAVA o Vídeo e Checkbox DO FITHUB */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={produto.picture}
                // COMO VAMOS COLOCAR A VISÃO DE DETALHE DO PRODUTO?
                title={`${produto.nameProduct}`}
              ></img>
            </div>

          </div>

          {/* Coluna de Instruções Dinâmicas */}
          <aside className="bg-[#7d8d2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold uppercase text-[#7d8d2a] font-anton mb-4">
              Execução Detalhada
            </h2>
            <p className="text-amber-100 mb-6">{produto.description}</p>

            <h2 className="text-2xl font-bold uppercase text-[#7d8d2a] font-anton mb-4">
              Tempo de Pausa
            </h2>
            {/* <p className="text-amber-100">{produto.time}</p> */}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DetalheProdutos;

function buscar(arg0: string, setProduto: Dispatch<SetStateAction<Produtos>>, { }) {
  throw new Error('Function not implemented.');
}
