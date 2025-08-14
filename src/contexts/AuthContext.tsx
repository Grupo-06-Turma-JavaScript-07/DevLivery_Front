// src/contexts/AuthContext.tsx
import { createContext, type ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type Usuario from '../models/Usuario';
import { login } from '../service/Service';
import { ToastAlerta } from '../utils/ToastAlerta';

// Interface para as credenciais que o formulário de login envia
interface CredenciaisLogin {
  usuario: string;
  senha: string;
}

interface AuthContextProps {
  usuario: Usuario;
  userRole: 'user' | 'fornecedor' | null;
  handleLogin(credenciais: CredenciaisLogin, role: 'user' | 'fornecedor'): Promise<void>;
  handleLogout(): void;
  isLoading: boolean;
  handleCadastro(usuario: Usuario, role: 'user' | 'fornecedor'): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const [userRole, setUserRole] = useState<'user' | 'fornecedor' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

async function handleLogin(credenciais: CredenciaisLogin, role: 'user' | 'fornecedor') {
    setIsLoading(true);
    try {

      await login(`/usuarios/logar`, credenciais, setUsuario); 

      ToastAlerta("Usuário logado com sucesso!", "sucesso");
      setUserRole(role);

      if (role === 'user') {
        navigate('/perfil');
      } else {
        navigate('/perfilfornecedor');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Dados do usuário inconsistentes.';
      ToastAlerta(errorMessage, 'erro');
    } finally {
      setIsLoading(false);
    }
}

  function handleCadastro(usuarioCadastrado: Usuario, role: 'user' | 'fornecedor') {
    setUsuario(usuarioCadastrado);
    setUserRole(role);
    if (role === 'user') {
      navigate('/perfil');
    } else {
      navigate('/perfilfornecedor');
    }
  }

  function handleLogout() {
    setUsuario({} as Usuario);
    setUserRole(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ usuario, userRole, handleLogin, handleLogout, isLoading, handleCadastro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}