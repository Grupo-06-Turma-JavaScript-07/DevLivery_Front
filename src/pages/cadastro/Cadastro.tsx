import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../service/Service"
import { RotatingLines } from "react-loader-spinner"

function Cadastro() {

  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }
  
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

  if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      }catch(error){
        alert('Erro ao cadastrar o usuário!')
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }


  return (
     <div className="min-h-screen bg-[#f0eff2] flex items-center justify-center px-4">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl border border-[#ececf0] overflow-hidden">
          <div className="h-2 bg-[#7d8d2a]" />

          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-xl font-extrabold">Criar conta</h1>
            </div>

            <form onSubmit={cadastrarNovoUsuario} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  value={usuario.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
                  value={usuario.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                  placeholder="email@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Foto (URL) — opcional</label>
                <input
                  type="url"
                  name="foto"
                  value={usuario.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Mínimo de 8 caracteres</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
                  <input
                    type="password"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    className="mt-1 w-full rounded-xl border border-[#d0d0d5] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#7d8d2a]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            <div className="grid grid-cols-2 gap-2">
              
               <button
                type="submit"
                className="w-full rounded-xl bg-[#bac971] text-white font-semibold 
                py-2 hover:brightness-110 hover:bg-[#788536] disabled:opacity-60"
              >
                {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                    <span>Cadastrar</span>
                 }
              </button>
              
              <button
                type="reset"
                onClick={retornar}
                className="w-full rounded-xl bg-[#bac971] text-white font-semibold py-2 
                hover:brightness-110 hover:bg-[#788536] disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
            </form>


            <div className="mt-4 text-sm text-center text-gray-600">
              Já tem conta?{' '}
              <Link to="/login" className="font-semibold text-[#e7a545] hover:underline">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro