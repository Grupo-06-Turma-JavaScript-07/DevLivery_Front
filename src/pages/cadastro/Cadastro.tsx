// src/pages/cadastro/Cadastro.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Se você usa seu util de toast próprio:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// OU, se já tem seu util ToastAlerta(mensagem, tipo): importe e troque os toasts abaixo
// import { ToastAlerta } from '../../utils/ToastAlerta';

type UsuarioNovo = {
  nome: string;
  usuario: string;   // email/username
  senha: string;
  foto?: string;
};

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UsuarioNovo>({
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (form.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      // ToastAlerta('A senha deve ter pelo menos 6 caracteres', 'erro');
      return;
    }
    if (form.senha !== confirmarSenha) {
      toast.error('As senhas não conferem');
      // ToastAlerta('As senhas não conferem', 'erro');
      return;
    }

    try {
      setLoading(true);
      await api.post('/usuarios/cadastrar', form); // ajuste a rota se necessário
      toast.success('Cadastro realizado! Faça login para continuar.');
      // ToastAlerta('Cadastro realizado! Faça login para continuar.', 'sucesso');
      setTimeout(() => navigate('/login'), 800);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Não foi possível concluir o cadastro.';
      toast.error(msg);
      // ToastAlerta(msg, 'erro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0eff2] flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl border border-[#ececf0] overflow-hidden">
          <div className="h-2 bg-[#7d8d2a]" />

          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#e7a545] grid place-items-center text-white font-black">K</div>
              <h1 className="text-xl font-extrabold">Criar conta</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">E-mail (usuário)</label>
                <input
                  type="email"
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="voce@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Foto (URL) — opcional</label>
                <input
                  type="url"
                  name="foto"
                  value={form.foto}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="https://imagem.com/avatar.png"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
                  <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#7d8d2a] text-white font-semibold py-2 hover:brightness-110 disabled:opacity-60"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

            <div className="mt-4 text-sm text-center text-gray-600">
              Já tem conta?{' '}
              <Link to="/login" className="font-semibold text-[#e7a545] hover:underline">
                Entrar
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





// import { type ChangeEvent, type FormEvent, useState } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
// import type Usuario from '../../models/Usuario';

// import { ToastAlerta } from '../../utils/ToastAlerta';

// import './Cadastro.css';
// import { useAppContext } from '../../contexts/AuthContext';
// import { cadastrarUsuario } from '../../service/Service';

// function Cadastro() {
//   const navigate = useNavigate();

//   const { handleCadastro } = useAppContext();

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [confirmaSenha, setConfirmaSenha] = useState<string>('');

//   const [usuario, setUsuario] = useState<Usuario>({
//     id: 0,
//     nome: '',
//     usuario: '',
//     senha: '',
//     foto: '',
//   });

//   function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
//     setUsuario({
//       ...usuario,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
//     setConfirmaSenha(e.target.value);
//   }

//   async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (confirmaSenha !== usuario.senha || usuario.senha.length < 8) {
//       ToastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'erro');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       await cadastrarUsuario(`/user`, usuario, (usuarioCadastrado: Usuario) => {
//         ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
//         handleCadastro(usuarioCadastrado, 'user');
//       });
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 'Erro ao cadastrar o usuário.';
//       ToastAlerta(errorMessage, 'erro');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
//       <div className="fundoCadastro hidden lg:block"></div>
//       <form
//         className="flex justify-center items-center flex-col w-2/3 gap-3"
//         onSubmit={cadastrarNovoUsuario}
//       >
//         <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
//         <div className="flex flex-col w-full">
//           <label htmlFor="nome">Nome</label>
//           <input
//             type="text" id="nome" name="nome" placeholder="Nome Completo"
//             className="border-2 border-slate-700 rounded p-2"
//             value={usuario.nome} onChange={atualizarEstado} required
//           />
//         </div>
//         <div className="flex flex-col w-full">
//           <label htmlFor="usuario">Email (usuário)</label>
//           <input
//             type="email" id="usuario" name="usuario" placeholder="exemplo@email.com"
//             className="border-2 border-slate-700 rounded p-2"
//             value={usuario.usuario} onChange={atualizarEstado} required
//           />
//         </div>

//         <div className="flex flex-col w-full">
//           <label htmlFor="foto">URL da Foto</label>
//           <input
//             type="text" id="foto" name="foto" placeholder="Link da sua foto"
//             className="border-2 border-slate-700 rounded p-2"
//             value={usuario.foto} onChange={atualizarEstado}
//           />
//         </div>
//         <div className="flex flex-col w-full">
//           <label htmlFor="senha">Senha</label>
//           <input
//             type="password" id="senha" name="senha" placeholder="Mínimo de 8 caracteres"
//             className="border-2 border-slate-700 rounded p-2"
//             value={usuario.senha} onChange={atualizarEstado} required
//           />
//         </div>
//         <div className="flex flex-col w-full">
//           <label htmlFor="confirmarSenha">Confirmar Senha</label>
//           <input
//             type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirme sua senha"
//             className="border-2 border-slate-700 rounded p-2"
//             value={confirmaSenha} onChange={handleConfirmarSenha} required
//           />
//         </div>
//         <div className="flex justify-around w-full gap-8">
//           <button
//             type="button" onClick={() => navigate('/login')}
//             className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
//           >
//             Cancelar
//           </button>
//           <button
//             type="submit"
//             className="rounded text-black bg-yellow-400 hover:bg-yellow-500 w-1/2 py-2 flex justify-center"
//           >
//             {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" width="24" /> : <span>Cadastrar</span>}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Cadastro;