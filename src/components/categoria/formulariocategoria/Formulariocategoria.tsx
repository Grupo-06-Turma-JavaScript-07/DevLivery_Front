import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';

import { ToastAlerta } from '../../../utils/ToastAlerta';
import { atualizar, buscar, cadastrar } from '../../../service/Service';
import { useAuthContext } from '../../../contexts/AuthContext';

function FormularioCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario } = useAuthContext();
    const token = usuario.token;

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        categoria: '',
    });

    // Função para buscar a categoria pelo ID (para o modo de edição)
    async function buscarPorId(id: string) {
        try {
            await buscar(`/Category/${id}`, setCategoria, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            ToastAlerta('Categoria não encontrada!', 'erro');
            navigate('/categorias/gerenciar');
        }
    }

    // O useEffect busca os dados se um 'id' existir na URL (modo edição)
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    // Função para atualizar o estado do formulário a cada digitação
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        });
    }

    // Função principal que é chamada ao enviar o formulário
    async function gerarNovaCategoria(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (token === undefined || token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro');
            return;
        }

        if (id !== undefined) {
            try {
                await atualizar(`/Category`, categoria, setCategoria, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta('Categoria atualizada com sucesso!', 'sucesso');
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar a Categoria.', 'erro');
            }
        } else {
            try {
                await cadastrar(`/Category`, categoria, setCategoria, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso');
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar a Categoria.', 'erro');
            }
        }
        retornar();
    }

    function retornar() {
        navigate('/categorias/gerenciar');
    }

    return (
        <div className="flex items-center justify-center bg-[#f1f1f3] text-black min-h-[85vh]">
            <form
                className="relative bg-white p-8 pt-0 rounded-lg shadow-lg w-full max-w-md overflow-hidden"
                onSubmit={gerarNovaCategoria}
            >
                {/* Faixa verde no topo */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#7d8d2a] rounded-t-lg"></div>

                <h1 className="text-4xl font-bold text-[#7d8d2a] font-anton mt-10 mb-8 text-center">
                    {id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                </h1>
                <div className="mb-6">
                    <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">
                        Nome da Categoria
                    </label>
                    <input
                        type="text"
                        id="categoria"
                        name="categoria"
                        value={categoria.categoria}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                        required
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={retornar}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-[#7d8d2a] hover:bg-[#6b7b25] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        {id ? 'Salvar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioCategoria;