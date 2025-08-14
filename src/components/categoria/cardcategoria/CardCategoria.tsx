import { Link } from 'react-router-dom';
import type Categoria from '../../../models/Categoria';


interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <Link to={`/produtos/categoria/${categoria.id}`} className="block">
      <div className="
        bg-yellow-400 text-black font-bold uppercase text-2xl 
        flex justify-center items-center h-32 rounded-lg 
        shadow-lg shadow-black/30 transform hover:-translate-y-1 
        transition-all duration-300 ease-in-out cursor-pointer
        font-anton
      ">
        {categoria.categoria}
      </div>
    </Link>
  );
}

export default CardCategoria;