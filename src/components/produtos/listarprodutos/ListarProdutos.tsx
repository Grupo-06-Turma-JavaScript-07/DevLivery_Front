// src/components/produtos/listarprodutos/ListarProdutos.tsx
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import type Produtos from '../../../models/Produtos';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { buscar } from '../../../service/Service';

function ListarProdutos() {
    // Estado para armazenar a lista de produtos que virá da API
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    // Função para buscar os produtos no back-end
    async function buscarProdutos() {
        try {
            await buscar('/product', setProdutos, {}); // Usando o endpoint "/product" do seu back-end
        } catch (error: any) {
            ToastAlerta('Erro ao buscar os produtos.', 'erro');
        }
    }

    // O useEffect chama a função de busca assim que o componente é renderizado
    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <div className="flex bg-neutral-900 text-white min-h-[85vh]">
            <SidebarPersonal />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-yellow-400 font-anton">
                        GERENCIAR EXERCÍCIOS
                    </h1>
                    <Link 
                        to="/cadastrarproduto" 
                        className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
                    >
                        Cadastrar Novo Exercício
                    </Link>
                </div>

                <div className="bg-neutral-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-700 text-amber-100 uppercase">
                            <tr>
                                <th className="p-4">Produto</th>
                                <th className="p-4">Categoria</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Agora o .map usa os dados do estado 'produtos', que vêm da API */}
                            {produtos.map(produto => (
                                <tr key={produto.id} className="border-b border-neutral-700 hover:bg-neutral-700/50">
                                    {/* Usamos as propriedades do nosso modelo: produto.name e produto.category */}
                                    <td className="p-4">{produto.name}</td>
                                    {/* Usamos "?." para acessar o nome da categoria de forma segura */}
                                    <td className="p-4">{produto.category?.category}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-4">
                                            <Link to={`/editarproduto/${produto.id}`} className="text-blue-400 hover:text-blue-300">
                                                <Pencil size={24} />
                                            </Link>
                                            <Link to={`/deletarproduto/${produto.id}`} className="text-red-500 hover:text-red-400">
                                                <Trash size={24} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ListarProdutos;