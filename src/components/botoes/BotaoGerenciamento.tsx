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
        bg-[#7d8d2a] text-white font-extrabold uppercase text-3xl
        flex justify-center items-center h-40 w-full max-w-md rounded-lg
        shadow-lg transform hover:-translate-y-1
        transition-all duration-300 ease-in-out"
    >
      {label}
    </Link>
  );
}

export default BotaoGerenciamento;