// src/pages/principal/ListarProdutos.tsx

import { useEffect, useState } from 'react';
import type Produtos from '../../../models/Produtos';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { buscar } from '../../../service/Service';
import { useNavigate } from 'react-router-dom';
import CardProdutos from '../cardprodutos/CardProdutos';
import { DNA } from 'react-loader-spinner';
import { useAuthContext } from '../../../contexts/AuthContext';

export default function ListarProdutos() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produtos[]>([]);
    const { usuario, handleLogout } = useAuthContext();
    const token = usuario.token;

    // Função para buscar os produtos no back-end
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
            }
        }
    }

    // Hook que checa o token ao renderizar o componente
    useEffect(() => {
        if (token === undefined || token === '') {
            ToastAlerta('Você precisa estar logado', 'erro');
            navigate('/login');
        }
    }, [token]);

    // Hook que chama a função de busca assim que o componente é montado
    useEffect(() => {
        buscarProdutos();
    }, [produtos.length]); // Chama a busca sempre que a lista de produtos mudar de tamanho

    return (
        <>
            {produtos.length === 0 && (
                <DNA
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-1">
                    <div className="container mx-auto my-4 
                         grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
                    >
                        {produtos.map((produto) => (
                            <CardProdutos key={produto.id} produto={produto} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}