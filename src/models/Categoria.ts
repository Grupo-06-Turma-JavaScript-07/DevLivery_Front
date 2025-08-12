import type Produtos from "./Produtos";

export default interface Categoria {
  id: number;
  category: string;
  product?: Produtos[] | null;
}