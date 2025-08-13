import { useState, type ChangeEvent, type FormEvent } from 'react'; // 
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../contexts/AuthContext';
import type Usuario from '../../models/Usuario';
import { RotatingLines } from 'react-loader-spinner';
import { cadastrarUsuario } from '../../service/Service';


export default function Cadastro() {
  const navigate = useNavigate();

  const { handleCadastro } = useAuthContext();
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }


  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.senha.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres');
      return;
    }
    if (form.senha !== confirmarSenha) {
      toast.error('As senhas não conferem');
      return;
    }
    try {
      setLoading(true);
      // Chama o serviço de cadastro, apontando para a rota correta do back-end
      await cadastrarUsuario('/users', form, (usuarioCadastrado: Usuario) => {
        toast.success('Cadastro realizado com sucesso!');
        // Chama a função do contexto para fazer o auto-login
        handleCadastro(usuarioCadastrado, 'user');
        
      });
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? 'Não foi possível concluir o cadastro.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1740&auto=format&fit=crop')" }}>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-lg z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="h-2 bg-[#7d8d2a]" />
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#e7a545] grid place-items-center text-white font-black">D</div>
              <h1 className="text-xl font-extrabold text-gray-800">Criar sua Conta</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome completo</label>
                <input type="text" name="nome" value={form.nome} onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="Seu nome" required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">E-mail (usuário)</label>
                <input type="email" name="usuario" value={form.usuario} onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="voce@exemplo.com" required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Foto (URL) — opcional</label>
                <input type="url" name="foto" value={form.foto} onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="https://imagem.com/avatar.png"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Senha</label>
                  <input type="password" name="senha" value={form.senha} onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••" required
                  />
                  <p className="text-xs text-gray-500 mt-1">Mínimo de 8 caracteres</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
                  <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••" required
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <button type="submit" disabled={loading}
                  className="w-full rounded-xl bg-[#7d8d2a] text-white font-semibold py-2.5 hover:bg-[#6a7a24] disabled:opacity-60 transition-colors"
                >
                  {loading ? <RotatingLines strokeColor="white" strokeWidth="5" width="24" /> : 'Finalizar Cadastro'}
                </button>
                <button type="button" onClick={() => navigate('/home')}
                  className="w-full rounded-xl bg-white text-[#6a7a24] font-semibold py-2.5 hover:bg-white disabled:opacity-60 transition-colors"
                >Cancelar Cadastro
                </button>
              </div>
            </form>
            <div className="mt-6 text-sm text-center text-gray-600">
              Já tem conta?{' '}
              <Link to="/login" className="font-semibold text-[#e7a545] hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-white/80 hover:underline">← Voltar para a Home</Link>
        </div>
      </div>
    </div>
  );
}