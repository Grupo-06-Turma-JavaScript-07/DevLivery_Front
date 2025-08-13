// import React from 'react';

// Renomeei a interface para seguir o padrão
interface PriceBadgeProps {
  price: number;
  old?: number;
  className?: string;
}

export default function SeloDePreco({ price, old, className }: PriceBadgeProps) {
  return (
    <div className={`rounded-full px-4 py-3 text-center shadow-md font-semibold text-white ${className}`}>
      <div className="text-xs opacity-90">PREÇO</div>
      <div className="text-lg leading-none">R$ {price}</div>
      {old && <div className="text-[11px] line-through opacity-90">R$ {old}</div>}
    </div>
  );
}