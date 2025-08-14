import { Link } from 'react-router-dom';

interface BotaoGerenciamentoProps {
  to: string;
  label: string;
}

function BotaoGerenciamento({ to, label }: BotaoGerenciamentoProps) {
  return (
    <Link
      to={to}
      className="
        hover:bg-[#d9d3d3] bg-[#2e7922d3] hover:text-[#2e7922d3] text-white font-extrabold uppercase text-3xl
        flex justify-center items-center h-20 w-full max-w-md rounded-lg
        shadow-lg transform hover:-translate-y-1
        transition-all duration-300 ease-in-out"
    >
      {label}
    </Link>
  );
}

export default BotaoGerenciamento;