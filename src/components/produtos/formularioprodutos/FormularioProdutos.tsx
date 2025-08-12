// src/components/produtos/formularioproduto/FormularioProduto.tsx
import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Produtos from '../../../models/Produtos';
import type Categoria from '../../../models/Categoria';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { buscar, atualizar, cadastrar } from '../../../service/Service';

function FormularioProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [produto, setProduto] = useState<Produtos>({
        id: 0,
        name: '',
        description: '',
        execution: '',
        time: '',
        category: null,
        user: null
    });

    async function buscarCategorias() {
        await buscar('/category', setCategorias, {});
    }

    async function buscarProdutoPorId(id: string) {
        await buscar(`/product/${id}`, setProduto, {});
    }

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setProduto(prevProduto => ({
            ...prevProduto,
            [name]:
                name === 'category'
                    ? categorias.find(c => c.id === parseInt(value)) || null
                    : value
        }));
    }

    async function gerarNovoProduto(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const produtoParaApi = { ...produto, user: { id: 2 } };

        if (id !== undefined) {
            try {
                await atualizar(`/product`, produtoParaApi, setProduto, {});
                ToastAlerta('Produto atualizado com sucesso!', 'sucesso');
                retornar();
            } catch (error: any) {
                ToastAlerta('Erro ao atualizar o Produto.', 'erro');
            }
        } else {
            try {
                await cadastrar(`/product`, produtoParaApi, setProduto, {});
                ToastAlerta('Produto cadastrado com sucesso!', 'sucesso');
                retornar();
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar o Produto.', 'erro');
            }
        }

    }

    function retornar() {
        navigate('/produtos/gerenciar');
    }

    return (
        <div className="flex items-center justify-center bg-neutral-900 text-white p-8 min-h-[85vh]">
            <form className="bg-neutral-800 p-8 rounded-lg w-full max-w-2xl" onSubmit={gerarNovoProduto}>
                <h1 className="text-4xl font-bold text-yellow-400 font-anton mb-8 text-center">{id ? 'Editar Produto' : 'Cadastrar Produto'}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-amber-100 font-bold mb-2">Nome do Exercício</label>
                        <input type="text" name="name" value={produto.name} onChange={atualizarEstado} className="w-full p-3 bg-neutral-700 rounded" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-amber-100 font-bold mb-2">Categoria</label>
                        <select name="category" value={produto.category?.id} onChange={atualizarEstado} className="w-full p-3 bg-neutral-700 rounded" required>
                            <option value="" disabled>Selecione uma categoria</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-amber-100 font-bold mb-2">
        URL do Vídeo (Incorporado)
    </label>
    <textarea 
        name="description" 
        value={produto.description} 
        onChange={atualizarEstado} 
        className="w-full p-3 bg-neutral-700 rounded" 
        rows={3}
        placeholder="Cole aqui o link de 'incorporar' do YouTube"
    ></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="execution" className="block text-amber-100 font-bold mb-2">Execução Correta</label>
                    <textarea name="execution" value={produto.execution} onChange={atualizarEstado} className="w-full p-3 bg-neutral-700 rounded" rows={3} required></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="time" className="block text-amber-100 font-bold mb-2">Tempo de Pausa</label>
                    <input type="text" name="time" value={produto.time} onChange={atualizarEstado} className="w-full p-3 bg-neutral-700 rounded" placeholder="Ex: 60 segundos" required />
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={retornar} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                    <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">{id ? 'Salvar' : 'Cadastrar'}</button>
                </div>
            </form>
        </div>
    );
}
export default FormularioProduto;