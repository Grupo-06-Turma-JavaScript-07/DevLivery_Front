
// src/components/categorias/listacategorias/ListarCategorias.tsx

import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../service/Service";
import { ToastAlerta } from '../../../utils/ToastAlerta';
import SidebarFornecedor from '../../sidebar/SidebarFornecedor';
import { Pencil, Trash } from "@phosphor-icons/react";


function ListarCategorias() {
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategorias() {
        try {
            await buscar('/Category', setCategorias, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
                ToastAlerta('Sessão expirada, faça o login novamente.', 'erro')
            }
        }
    }

    // Hook que checa o token ao renderizar o componente
    useEffect(() => {
        if (token === '' || token === undefined) {
            ToastAlerta('Você precisa estar logado', 'erro')
            navigate('/login'); // Corrigido para a rota de login
        }
    }, [token])

    // Hook que chama a função de busca assim que o componente é montado
    useEffect(() => {
        buscarCategorias()
    }, [categorias.length]) // A busca é chamada sempre que a lista de categorias muda

    return (
        <div className="flex bg-[#f1f1f3] text-black min-h-[85vh]">
            <SidebarFornecedor />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[#7d8d2a] font-anton">
                        GERENCIAR CATEGORIAS
                    </h1>
                    <Link
                        to="/cadastrarcategoria"
                        className="bg-[#7d8d2a] text-[#f1f1f3] font-bold py-2 px-4 rounded hover:bg-[#7d8d2a] transition-colors"
                    >
                        Cadastrar Nova Categoria
                    </Link>
                </div>

                {categorias.length === 0 ? (
                    <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperClass="dna-wrapper mx-auto"
                    />
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {Array.isArray(categorias) && categorias.map(categoria => (
                            <div key={categoria.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <p className="text-lg text-gray-800">{categoria.categoria}</p>
                                <div className="flex gap-4">
                                    <Link to={`/editarcategoria/${categoria.id}`} className="text-blue-500 hover:text-blue-400">
                                        <Pencil size={24} />
                                    </Link>
                                    <Link to={`/deletarcategoria/${categoria.id}`} className="text-red-500 hover:text-red-400">
                                        <Trash size={24} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ListarCategorias;