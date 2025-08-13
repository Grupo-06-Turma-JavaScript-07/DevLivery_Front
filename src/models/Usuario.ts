import type Produtos from "./Produtos"

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  product?: Produtos[] | null;
  
}