import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';

import { ToastAlerta } from '../../../utils/ToastAlerta';
import { atualizar, buscar, cadastrar } from '../../../service/Service';

function FormularioCategoria() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Estado para armazenar os dados da categoria
    const [categoria, setCategoria] = useState<Categoria>({id: 0,
        category: ''});

    // Função para buscar a categoria pelo ID (para o modo de edição)
    async function buscarPorId(id: string) {
        await buscar(`/category/${id}`, setCategoria, {});
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
            [e.target.name]: e.target.value
        });
    }

    // Função principal que é chamada ao enviar o formulário
    async function gerarNovaCategoria(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Se 'id' existe, estamos no modo EDIÇÃO
        if (id !== undefined) {
            try {
                await atualizar(`/category`, categoria, setCategoria, {});
                ToastAlerta('Categoria atualizada com sucesso!', 'sucesso');
                retornar();
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar a Categoria.', 'erro');
            }
        // Se 'id' não existe, estamos no modo CADASTRO
        } else {
            try {
                await cadastrar(`/category`, categoria, setCategoria, {});
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
        <div className="flex items-center justify-center bg-neutral-900 text-white min-h-[85vh]">
            <form className="bg-neutral-800 p-8 rounded-lg w-full max-w-md" onSubmit={gerarNovaCategoria}>
                <h1 className="text-4xl font-bold text-yellow-400 font-anton mb-8 text-center">
                    {id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                </h1>
                <div className="mb-6">
                    <label htmlFor="category" className="block text-amber-100 font-bold mb-2">Nome da Categoria</label>
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        value={categoria.category} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        className="w-full p-3 bg-neutral-700 rounded focus:ring-2 focus:ring-yellow-400" 
                        required 
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={retornar}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                        {id ? 'Salvar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default FormularioCategoria;