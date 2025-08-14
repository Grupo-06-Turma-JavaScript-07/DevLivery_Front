// src/components/produtos/deletarprodutos/DeletarProdutos.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { useEffect, useState, useContext } from 'react';
import type Produtos from '../../../models/Produtos';
import { buscar, deletar } from '../../../service/Service';
import { AuthContext } from '../../../contexts/AuthContext'; // Importe o AuthContext

function DeletarProdutos() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    // Pega o token do usuário logado
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [produto, setProduto] = useState<Produtos>({} as Produtos);
    
    async function buscarPorId(id: string) {
        try {
            // Envia o token no cabeçalho da requisição
            await buscar(`/Product/${id}`, setProduto, {
                headers: { 'Authorization': token }
            });
        } catch (error: any) {
            ToastAlerta('Erro ao buscar produto.', 'erro');
        }
    }
    
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'aviso');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);
    
    async function deletarProduto() {
        try {
            // Envia o token no cabeçalho da requisição
            await deletar(`/Product/${id}`, {
                headers: { 'Authorization': token }
            });
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
        <div className="flex items-center justify-center bg-[#f0eff2] min-h-screen p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tem certeza que deseja deletar o produto?</h1>
                <p className="text-4xl font-extrabold text-[#7d8d2a] mb-8">
                    {produto.nameProduct}
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={retornar}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-8 rounded-lg transition-colors">
                        Não
                    </button>
                    <button onClick={deletarProduto}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition-colors">
                        Sim, deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DeletarProdutos;