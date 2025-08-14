// src/pages/cardapio/Cardapio.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. IMPORTE O useSearchParams
import { useAuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../service/Service';

import type Categoria from '../../models/Categoria';
import type Produtos from '../../models/Produtos';

import { ToastAlerta } from '../../utils/ToastAlerta';
import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react';
import { DNA } from 'react-loader-spinner';
import CardProdutos from '../../components/produtos/cardprodutos/CardProdutos';

function Cardapio() {
    const { usuario } = useAuthContext();
    const token = usuario.token;

    const [produtos, setProdutos] = useState<Produtos[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState('');
    const [modoRecomendacao, setModoRecomendacao] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);

    // 2. ADICIONE O HOOK PARA LER OS PARÂMETROS DA URL
    const [searchParams] = useSearchParams();

    // Função unificada para buscar os dados
    async function fetchData() {
        setLoading(true);
        let endpointProdutos = '/Product'; // Endpoint padrão

        if (modoRecomendacao) {
            endpointProdutos = '/Product/recomendados'; // Endpoint para recomendações
        }

        try {
            await Promise.all([
                buscar(endpointProdutos, setProdutos, { headers: { Authorization: token } }),
                buscar('/Category', setCategorias, { headers: { Authorization: token } })
            ]);
        } catch (error: any) {
            ToastAlerta('Erro ao carregar o cardápio.', 'erro');
        } finally {
            setLoading(false);
        }
    }

    // Efeito para buscar os dados quando o token ou o modo de recomendação mudam
    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, modoRecomendacao]);

    // 3. ADICIONE O NOVO useEffect PARA LER A URL
    // Este useEffect lê a URL assim que a página carrega
    useEffect(() => {
        // Pega o valor do parâmetro 'view'
        const viewMode = searchParams.get('view');
        
        // Se a URL contiver ?view=recomendados, ativa o modo de recomendação
        if (viewMode === 'recomendados') {
            setModoRecomendacao(true);
        } else {
            // Caso contrário, garante que o modo de recomendação esteja desativado
            setModoRecomendacao(false);
        }
    }, [searchParams]); // Roda sempre que a URL mudar

    // Lógica de filtragem e busca
    const produtosFiltrados = produtos
        .filter(produto => 
            categoriaSelecionada ? produto.category?.id === categoriaSelecionada : true
        )
        .filter(produto => 
            produto.nameProduct.toLowerCase().includes(busca.toLowerCase())
        );

    return (
        <div className="bg-[#f0eff2] min-h-screen flex flex-col md:flex-row">
            {/* Sidebar de Categorias */}
            <aside className="w-full md:w-72 bg-white p-6 shadow-lg md:rounded-tr-3xl">
                {/* Botão de Recomendações RESTAURADO */}
                <button
                    onClick={() => setModoRecomendacao(!modoRecomendacao)}
                    className={`w-full p-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 mb-6 ${
                        modoRecomendacao
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-[#7d8d2a] text-white hover:bg-[#6b7b25]'
                    }`}
                >
                    <Sparkle size={20} />
                    {modoRecomendacao ? 'Ver Todos os Produtos' : 'Minhas Recomendações'}
                </button>

                <h2 className="text-2xl font-bold text-[#7d8d2a] mb-4">Categorias</h2>
                <nav className="space-y-2">
                    <div 
                        onClick={() => setCategoriaSelecionada(null)}
                        className={`p-2 rounded-lg font-semibold transition-colors cursor-pointer ${!categoriaSelecionada ? 'bg-[#e7a545] text-white' : 'hover:bg-gray-100'}`}
                    >
                        Todas
                    </div>
                    {categorias.map(categoria => (
                        <div 
                            key={categoria.id}
                            onClick={() => setCategoriaSelecionada(categoria.id)}
                            className={`p-2 rounded-lg font-semibold transition-colors cursor-pointer ${categoriaSelecionada === categoria.id ? 'bg-[#e7a545] text-white' : 'hover:bg-gray-100'}`}
                        >
                            {categoria.categoria}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Conheça nosso cardápio
                </h1>
                <p className="text-gray-500 mb-8">Ingredientes frescos, pratos deliciosos e saudáveis entregues para você.</p>
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por nome do prato..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    />
                    <MagnifyingGlass size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {loading ? (
                    <div className="flex justify-center mt-20">
                        <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {produtosFiltrados.map(produto => (
                            <CardProdutos key={produto.id} produto={produto} />
                        ))}
                    </div>
                )}
                {produtosFiltrados.length === 0 && !loading && (
                    <p className="text-center text-gray-500 italic mt-10">Nenhum produto encontrado.</p>
                )}
            </main>
        </div>
    );
}

export default Cardapio;