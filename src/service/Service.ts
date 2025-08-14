
import axios from "axios";
import type Usuario from "../models/Usuario";
import type Produtos from "../models/Produtos";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}


export const cadastrarUsuario = async (url: string, dados: Usuario, setDados: (usuario: Usuario) => void) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}


export const buscar = async (url: string, setDados: Function, headers: Object) => {
    const resposta = await api.get(url, headers);
    setDados(resposta.data);
}


export const cadastrar = async (url: string, dados: Object, setDados: Function, headers: Object) => {
    const resposta = await api.post(url, dados, headers);
    setDados(resposta.data);
}


export const atualizar = async (url: string, dados: Object, setDados: Function, headers: Object) => {
    const resposta = await api.put(url, dados, headers);
    setDados(resposta.data);
}


export const deletar = async (url: string, headers: Object) => {
    await api.delete(url, headers);
}

// export const buscarRecomendados = async (setDados: (produtos: Produtos[]) => void) => {
//     const termosBusca = ['saudavel', 'fit', 'natural', 'integral', 'sem-acucar'];
//     const termosFormatados = termosBusca.join(','); // Cria uma string "saudavel,fit,natural,..."
//     const resposta = await api.get(`/Product/recomendados/${termosFormatados}`);
//     setDados(resposta.data);
// }

export const buscarRecomendados = async (setDados: (produtos: Produtos[]) => void) => {
  try {
    const termosBusca = ['saudavel', 'fit', 'natural', 'integral', 'sem-acucar'];
    const termosFormatados = termosBusca.join(',');
    const resposta = await api.get(`/Product/recomendados/${termosFormatados}`);
    setDados(resposta.data);
  } catch (error: any) {
    console.error("Erro na busca de recomendações:", error);
    setDados([]);
    throw error;
  }
};