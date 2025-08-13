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
              <h1 className="text-xl font-extrabold">Entrar</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">E-mail</label>
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
      </div>
    </div>
  );
}

