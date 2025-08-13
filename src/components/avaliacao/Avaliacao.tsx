// src/components/rating/Rating.tsx
import React from 'react';

// O componente Star é um auxiliar para o Rating
const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 2l2.92 5.92 6.54.95-4.73 4.61 1.12 6.52L12 17.77 6.15 20l1.12-6.52L2.54 8.87l6.54-.95L12 2z"/>
  </svg>
);

interface RatingProps {
  value?: number;
}

export default function Avaliacao({ value = 4.5 }: RatingProps) {
  return (
    <div className="flex items-center gap-1 text-[#5b5b5b]">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />)}
      <span className="ml-2 text-sm font-medium">{value}</span>
      <span className="text-sm underline ml-1">523 Avaliações</span>
    </div>
  );
}