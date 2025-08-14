// src/pages/principal/GerenciarProduto.tsx

import { useEffect, useState } from 'react';
import SidebarFornecedor from '../../sidebar/SidebarFornecedor';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash } from '@phosphor-icons/react';
import type Produtos from '../../../models/Produtos';
import { useAuthContext } from '../../../contexts/AuthContext';
import { buscar } from '../../../service/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

// O componente GerenciarProduto não precisa mais receber props
function GerenciarProduto() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useAuthContext();
    const token = usuario.token;
    
    const [produtos, setProdutos] = useState<Produtos[]>([]);

    async function buscarProdutos() {
        try {
            await buscar('/Product', setProdutos, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
                ToastAlerta('Sessão expirada, faça o login novamente.', 'erro');
            } else {
                ToastAlerta('Erro ao buscar os produtos.', 'erro');
            }
        }
    }

    useEffect(() => {
        if (token === undefined || token === '') {
            ToastAlerta('Você precisa estar logado', 'erro');
            navigate('/login');
        } else {
            buscarProdutos();
        }
    }, [token]);

    return (
        <div className="flex bg-[#f1f1f3] text-black min-h-[85vh]">
            <SidebarFornecedor />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[#7d8d2a] font-anton">
                        GERENCIAR PRODUTOS
                    </h1>
                    <Link
                        to="/cadastrarproduto"
                        className="bg-[#7d8d2a] text-[#f1f1f3] font-bold py-2 px-4 rounded hover:bg-[#6b7b25] transition-colors"
                    >
                        Cadastrar Novo Produto
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg overflow-hidden shadow-lg">
                    <table className="w-full text-left">
                        <thead className="bg-[#7d8d2a] text-white uppercase">
                            <tr>
                                <th className="p-4">Produto</th>
                                <th className="p-4">Preço</th>
                                <th className="p-4">Categoria</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr key={produto.id} className="border-b border-[#f1f1f3] hover:bg-[#f1f1f3] transition-colors">
                                    <td className="p-4">{produto.nameProduct}</td>
                                    <td className="p-4">R$ {produto.price}</td>
                                    <td className="p-4">{produto.category?.categoria}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-4">
                                            <Link to={`/editarproduto/${produto.id}`} className="text-[#7d8d2a] hover:text-[#6b7b25]">
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

export default GerenciarProduto;