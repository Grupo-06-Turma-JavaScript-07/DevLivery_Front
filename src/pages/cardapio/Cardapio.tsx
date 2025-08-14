// src/pages/cardapio/Cardapio.tsx

import { useEffect, useState } from 'react';
import type Produtos from '../../models/Produtos';
import type Categoria from '../../models/Categoria';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { buscar, } from '../../service/Service';
import { useAuthContext } from '../../contexts/AuthContext';
import CardProdutos from '../../components/produtos/cardprodutos/CardProdutos';
import { DNA } from 'react-loader-spinner';
import { MagnifyingGlass } from '@phosphor-icons/react';

function Cardapio() {
    const { usuario } = useAuthContext();
    const token = usuario.token;

    const [produtos, setProdutos] = useState<Produtos[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState('');
    const [modoRecomendacao, setModoRecomendacao] = useState(false);

    const headers = { Authorization: token };

    async function buscarTodosProdutos() {
        setLoading(true);
        try {
            await buscar('/Product', setProdutos, { headers });
        } catch (error: any) {
            ToastAlerta('Erro ao carregar os produtos.', 'erro');
        } finally {
            setLoading(false);
        }
    }

    async function buscarProdutosPorNome(nome: string) {
        setLoading(true);
        try {
            await buscar(`/Product/nameProduct/${nome}`, setProdutos, { headers });
        } catch (error: any) {
            ToastAlerta('Erro ao buscar produtos.', 'erro');
            setProdutos([]);
        } finally {
            setLoading(false);
        }
    }

    async function buscarCategorias() {
        try {
            await buscar('/Category', setCategorias, { headers });
        } catch (error: any) {
            ToastAlerta('Erro ao carregar as categorias.', 'erro');
        }
    }

    async function buscarProdutosRecomendados() {
        setLoading(true);
        try {
            // AQUI: A chamada para a rota de recomendados deve ser ajustada
            // para o Service.ts
            await buscar('/Product/recomendados/saudavel,fit,natural,integral,sem-acucar', setProdutos, { headers });
        } catch (error: any) {
            ToastAlerta('Erro ao carregar as recomendações.', 'erro');
            setProdutos([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            buscarCategorias();
            if (modoRecomendacao) {
                buscarProdutosRecomendados();
            } else {
                buscarTodosProdutos();
            }
        }
    }, [token, modoRecomendacao]);

    useEffect(() => {
        if (busca.length > 0) {
            setModoRecomendacao(false);
            buscarProdutosPorNome(busca);
        } else {
            if (!modoRecomendacao) {
                buscarTodosProdutos();
            }
        }
    }, [busca]);


    return (
        <div className="bg-[#f1f1f3] min-h-screen flex">
            <aside className="w-64 bg-white p-6 shadow-lg rounded-tr-3xl hidden md:block">
                <button
                    onClick={() => {
                        setModoRecomendacao(!modoRecomendacao);
                        setBusca('');
                    }}
                    className={`w-full p-3 rounded-lg font-bold transition-colors mb-6 ${
                        modoRecomendacao
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-[#7d8d2a] text-white hover:bg-[#6b7b25]'
                    }`}
                >
                    {modoRecomendacao ? 'Ver todos os produtos' : 'Minhas Recomendações'}
                </button>

                <h2 className="text-2xl font-bold text-[#7d8d2a] mb-6">Categorias</h2>
                <nav className="space-y-4">
                    {categorias.map(categoria => (
                        <div key={categoria.id} className="flex items-center gap-3 text-lg text-gray-700 hover:text-[#7d8d2a] transition-colors cursor-pointer">
                            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                            <span>{categoria.categoria}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                    Conheça nosso cardápio
                </h1>

                <div className="flex items-center gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    />
                    <button onClick={() => {}} className="bg-[#7d8d2a] text-white p-3 rounded-lg hover:bg-[#6b7b25] transition-colors">
                        <MagnifyingGlass size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
                    </div>
                ) : (
                    <div>
                        {categorias.map(categoria => {
                            const produtosDaCategoria = produtos.filter(p => p.category?.id === categoria.id);
                            if (produtosDaCategoria.length > 0) {
                                return (
                                    <div key={categoria.id} className="mb-10">
                                        <h2 className="text-3xl font-extrabold text-gray-700 mb-6 border-b-2 border-gray-200 pb-2">
                                            {categoria.categoria}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                            {produtosDaCategoria.map(produto => (
                                                <CardProdutos key={produto.id} produto={produto} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {produtos.length === 0 && !loading && (
                            <p className="text-center text-gray-500 italic mt-10">Nenhum produto encontrado para sua busca.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Cardapio;