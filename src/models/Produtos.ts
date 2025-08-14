import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produtos {
  id: number;
  nameProduct: string;
  description: string;
  price: number;
  picture: string;    
  category?: Categoria | null
  user: Usuario | null


}