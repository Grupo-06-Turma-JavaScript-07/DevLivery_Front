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
  userRole: 'user' | 'personal' | null;
  handleLogin(credenciais: CredenciaisLogin, role: 'user' | 'personal'): Promise<void>;
  handleLogout(): void;
  isLoading: boolean;
  handleCadastro(usuario: Usuario, role: 'user' | 'personal'): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const [userRole, setUserRole] = useState<'user' | 'personal' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(credenciais: CredenciaisLogin, role: 'user' | 'personal') {
    setIsLoading(true);
    try {
      await login(`/user/logar`, credenciais, setUsuario);
      ToastAlerta("Usuário logado com sucesso!", "sucesso");
      setUserRole(role);

      if (role === 'user') {
        navigate('/perfil');
      } else {
        navigate('/perfilpersonal');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Dados do usuário inconsistentes.';
      ToastAlerta(errorMessage, 'erro');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCadastro(usuarioCadastrado: Usuario, role: 'user' | 'personal') {
    setUsuario(usuarioCadastrado);
    setUserRole(role);
    if (role === 'user') {
      navigate('/perfil');
    } else {
      navigate('/perfilpersonal');
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

// O hook para usar o contexto
export function useAuthContext() {
  return useContext(AuthContext);
}