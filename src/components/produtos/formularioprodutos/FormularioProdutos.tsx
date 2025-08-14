// src/components/produtos/formularioproduto/FormularioProduto.tsx

import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Produtos from '../../../models/Produtos';
import type Categoria from '../../../models/Categoria';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { buscar, atualizar, cadastrar } from '../../../service/Service';
import { useAuthContext } from '../../../contexts/AuthContext';

function FormularioProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario } = useAuthContext();
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [produto, setProduto] = useState<Produtos>({
    id: 0,
    nameProduct: '',
    description: '',
    price: 0,
    picture: '',
    category: null,
    user: null,
  });

  async function buscarCategorias() {
    try {
      await buscar('/Category', setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      ToastAlerta('Erro ao buscar categorias. Tente novamente!', 'erro');
    }
  }

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/Product/${id}`, setProduto, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      ToastAlerta('Produto não encontrado!', 'erro');
    }
  }

  useEffect(() => {
    if (token === undefined || token === '') {
      ToastAlerta('Você precisa estar logado para ver os produtos.', 'erro');
      navigate('/login');
    } else {
      buscarCategorias();
      if (id !== undefined) {
        buscarProdutoPorId(id);
      }
    }
  }, [id, token]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]:
        name === 'category'
          ? categorias.find((c) => c.id === parseInt(value)) || null
          : name === 'price'
          ? parseFloat(value)
          : value,
    }));
  }

  async function gerarNovoProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const produtoParaApi = { ...produto, user: { id: usuario.id } };

    if (id !== undefined) {
      try {
        await atualizar(`/Product`, produtoParaApi, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta('Produto atualizado com sucesso!', 'sucesso');
      } catch (error: any) {
        ToastAlerta('Erro ao atualizar o Produto.', 'erro');
      }
    } else {
      try {
        await cadastrar(`/Product`, produtoParaApi, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta('Produto cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        ToastAlerta('Erro ao cadastrar o Produto.', 'erro');
      }
    }
    
    retornar();
  }

  function retornar() {
    navigate('/produtos/gerenciar');
  }

  return (
    <div className="flex items-center justify-center bg-[#f1f1f3] text-black p-8 min-h-[85vh]">
      <form
        className="relative bg-white p-8 pt-0 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"
        onSubmit={gerarNovoProduto}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-[#7d8d2a] rounded-t-lg"></div>

        <h1 className="text-4xl font-bold text-[#7d8d2a] font-anton mt-10 mb-8 text-center">
          {id ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="nameProduct" className="block text-gray-700 font-bold mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nameProduct"
              name="nameProduct"
              value={produto.nameProduct}
              onChange={atualizarEstado}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Preço
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={produto.price}
              onChange={atualizarEstado}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="picture" className="block text-gray-700 font-bold mb-2">
            URL da Imagem
          </label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={produto.picture}
            onChange={atualizarEstado}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={produto.category?.id}
            onChange={atualizarEstado}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Descrição do Produto
          </label>
          <textarea
            id="description"
            name="description"
            value={produto.description}
            onChange={atualizarEstado}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d8d2a]"
            rows={3}
            required
          ></textarea>
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

export default FormularioProduto;