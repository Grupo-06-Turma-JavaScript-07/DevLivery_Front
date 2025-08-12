import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../contexts/AuthContext'; // ajuste o caminho se preciso

// Se seu handleLogin espera outro shape, ajuste este tipo:
type Credenciais = {
  usuario: string; // email/username
  senha: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin, isLoading } = useAppContext();

  const [form, setForm] = useState<Credenciais>({
    usuario: '',
    senha: '',
  });

  function atualizar(e: ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.usuario || !form.senha) {
      toast.error('Preencha usuário e senha');
      return;
    }

    try {
      const ok = await handleLogin(form); // seu contexto deve retornar boolean ou lançar erro
      if (ok) {
        toast.success('Login realizado!');
        // espere um tique para mostrar o toast e navegar
        setTimeout(() => navigate('/'), 300); // ajuste a rota pós-login
      } else {
        toast.error('Usuário ou senha inválidos');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? 'Falha no login';
      toast.error(msg);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0eff2] flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-[#ececf0] overflow-hidden">
          {/* faixa superior com a cor da paleta */}
          <div className="h-2 bg-[#7d8d2a]" />

          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#e7a545] grid place-items-center text-white font-black">K</div>
              <h1 className="text-xl font-extrabold">Entrar</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">E-mail ou usuário</label>
                <input
                  type="text"
                  name="usuario"
                  value={form.usuario}
                  onChange={atualizar}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={atualizar}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#7d8d2a] text-white font-semibold py-2 hover:brightness-110 disabled:opacity-60"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-4 text-sm text-center text-gray-600">
              Não tem conta?{' '}
              <Link to="/cadastro" className="font-semibold text-[#e7a545] hover:underline">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-600 hover:underline">← Voltar para a Home</Link>
        </div>
      </div>
    </div>
  );
}









// src/pages/login/Login.tsx
// import { type ChangeEvent, type FormEvent, useState } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import type UsuarioLogin from '../../models/UsuarioLogin';
// import './Login.css';
// import { useAppContext } from '../../contexts/AuthContext';

// function Login() {
//     const { handleLogin, isLoading } = useAppContext();
//     const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
//     id: 0,
//     nome: '',
//     usuario: '',
//     senha: '',
//     foto: '',
//     token: ''
// });
//     // Estado para guardar a seleção de perfil
//     const [role, setRole] = useState<'user' | 'personal'>('user'); 

//     function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
//         setUsuarioLogin({
//             ...usuarioLogin,
//             [e.target.name]: e.target.value,
//         });
//     }

//     function login(e: FormEvent<HTMLFormElement>) {
//         e.preventDefault();
       
//         handleLogin(usuarioLogin, role); 
//     }

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
//             <form className="flex justify-center items-center flex-col w-1/1.5 gap-4 pl-30" onSubmit={login}>
//                 <h2 className="text-slate-900 text-5xl">Faça seu Login</h2>
                
//                 {/* SELEÇÃO DE PERFIL */}
//                 <div className="flex gap-6 my-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="h-5 w-5"/>
//                         Sou Cliente
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input type="radio" name="role" value="personal" checked={role === 'personal'} onChange={() => setRole('personal')} className="h-5 w-5"/>
//                         Sou Vendedor
//                     </label>
//                 </div>

//                 <div className="flex flex-col w-full">
//                     <label htmlFor="usuario">Email (usuário)</label>
//                     <input type="email" id="usuario" name="usuario" placeholder="exemplo@email.com"
//                         className="border-2 border-slate-700 rounded p-2"
//                         value={usuarioLogin.usuario} onChange={atualizarEstado} required
//                     />
//                 </div>
//                 <div className="flex flex-col w-full">
//                     <label htmlFor="senha">Senha</label>
//                     <input type="password" id="senha" name="senha" placeholder="Sua senha"
//                         className="border-2 border-slate-700 rounded p-2"
//                         value={usuarioLogin.senha} onChange={atualizarEstado} required
//                     />
//                 </div>
//                 <button type="submit"
//                     className="rounded bg-yellow-400 flex justify-center hover:bg-yellow-500 text-black w-1/2 py-2">
//                     {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" width="24" /> : <span>Entrar</span>}
//                 </button>
//                 <hr className="border-slate-800 w-full" />
//                 <p>Ainda não tem uma conta? <Link to="/cadastro" className="text-yellow-400 hover:underline">Cadastre-se</Link></p>
//             </form>
//             <div className="fundoLogin hidden lg:block"></div>
//         </div>
//     );
// }

// export default Login;


