// src/components/produtos/deletarprodutos/DeletarProduto.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { useEffect, useState } from 'react';
import type Produtos from '../../../models/Produtos';
import { buscar, deletar } from '../../../service/Service';

function DeletarProdutos() {
    const navigate = useNavigate();
        const { id } = useParams<{ id: string }>();
    
        const [produto, setProduto] = useState<Produtos>({} as Produtos);
    
        // Função para buscar os dados da produto específica pelo ID
        async function buscarPorId(id: string) {
            try {
                await buscar(`/product/${id}`, setProduto, {});
            } catch (error: any) {
                ToastAlerta('Erro ao buscar produto.', 'erro');
            }
        }
    
        // O useEffect busca os dados da produto assim que a página é carregada
        useEffect(() => {
            if (id !== undefined) {
                buscarPorId(id);
            }
        }, [id]);
    
        // Função que será chamada pelo clique no botão de confirmar
        async function DeletarProdutos() {
            try {
                await deletar(`/product/${id}`, {});
                ToastAlerta('Produto deletado com sucesso!', 'sucesso');
            } catch (error) {
                ToastAlerta('Erro ao deletar produto.', 'erro');
            }
            retornar();
        }
    
        function retornar() {
            navigate('/produtos/gerenciar');
        }

    return (
        <div className="flex items-center justify-center bg-neutral-900 text-white min-h-[85vh]">
            <div className="bg-neutral-800 p-8 rounded-lg text-center w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Tem certeza que deseja deletar o produto?</h1>
                {/* Exibe o nome do produto que foi buscada da API */}
                <p className="text-4xl font-bold text-yellow-400 font-anton mb-8">
                    {produto.name}
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={retornar}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded">
                        Não
                    </button>
                    <button onClick={DeletarProdutos}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded">
                        Sim, deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DeletarProdutos;