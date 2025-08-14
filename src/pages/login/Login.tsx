import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../contexts/AuthContext';


const Eye = ({ className = '' }) => (<svg viewBox="0 0 24 24" className={className} aria-hidden><path fill="currentColor" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" /></svg>);
const EyeOff = ({ className = '' }) => (<svg viewBox="0 0 24 24" className={className} aria-hidden><path fill="currentColor" d="M2 5.27 3.28 4l16.97 16.97-1.27 1.27-3.24-3.24A11.7 11.7 0 0 1 12 19C5 19 2 12 2 12a19.4 19.4 0 0 1 4.2-5.83L2 5.27ZM12 7a5 5 0 0 1 5 5c0 .62-.11 1.21-.31 1.76L13.24 10.3c-.55-.2-1.14-.3-1.76-.3Z" /></svg>);
type Credenciais = { usuario: string; senha: string; };

export default function Login() {
  const { handleLogin, isLoading } = useAuthContext();


  const [form, setForm] = useState<Credenciais>({ usuario: '', senha: '' });
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<'user' | 'fornecedor'>('user');


  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await handleLogin(form, role);

  }

  return (
    <div className="min-h-screen bg-[#f0eff2]">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Coluna da Imagem (Esquerda) */}
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('https://ik.imagekit.io/qvv2cbqgy/Design%20sem%20nome.png.PNG?updatedAt=1755129906115')" }}>



        {/* Coluna do Formulário (Direita) */}
        <main className="flex-1 grid place-items-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl border border-[#ececf0] overflow-hidden">

              <div className="h-2 bg-[#7d8d2a]" />

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#e7a545] grid place-items-center text-white font-black">D</div>
                  <h1 className="text-xl font-extrabold">Entrar na sua Conta</h1>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">

                  {/* SELETOR DE PERFIL */}
                  <div className="flex justify-center gap-6 py-2">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                        className="h-4 w-4 text-[#7d8d2a] focus:ring-[#9cb03b]"
                      />
                      Sou Usuário
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="role"
                        value="fornecedor"
                        checked={role === 'fornecedor'}
                        onChange={() => setRole('fornecedor')}
                        className="h-4 w-4 text-[#7d8d2a] focus:ring-[#9cb03b]"
                      />
                      Sou Fornecedor
                    </label>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="usuario">E-mail</label>
                    <input
                      id="usuario" name="usuario" value={form.usuario} onChange={onChange}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                      placeholder="voce@exemplo.com" required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="senha">Senha</label>
                    <div className="mt-1 relative">
                      <input
                        id="senha" type={showPass ? 'text' : 'password'} name="senha"
                        value={form.senha} onChange={onChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                        placeholder="••••••••" required
                      />
                      <button type="button" onClick={() => setShowPass(s => !s)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                        aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {showPass ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading}
                    className="w-full rounded-xl bg-[#7d8d2a] text-white font-semibold py-2.5 shadow-sm hover:bg-[#6a7a24] disabled:opacity-60 transition-colors"
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>

                <div className="mt-6 text-sm text-center text-gray-600">
                  Não tem conta?{' '}
                  <Link to="/cadastro" className="font-semibold text-[#e7a545] hover:underline">
                    Cadastre-se
                  </Link>
                </div>
              </div>
            </div>

            {/* Link "Voltar para Home" */}
            <div className="text-center mt-6">
              <Link to="/home" className="text-sm text-gray-600 hover:underline">← Voltar para a Home</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}