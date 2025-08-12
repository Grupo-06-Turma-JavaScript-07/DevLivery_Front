import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produtos {
  id: number;
  name: string;
  description: string;
  execution: string;
  time: string;  
  user: Usuario | null
  category?: Categoria | null
}