
import axios from "axios";
import type Usuario from "../models/Usuario";


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