// src/components/botao_acao/BotaoAcao.tsx
import React from 'react';

interface BotaoAcaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "ghost";
}

export default function BotaoAcao({ children, variant = "solid", className = "", ...props }: BotaoAcaoProps) {
    return (
        <button
            className={
                variant === "solid"
                    ? `px-5 py-3 rounded-xl font-semibold shadow-sm bg-[#2e7922d3] text-white hover:brightness-110 transition ${className}` // Verde Oliva
                    : `px-5 py-3 rounded-xl font-semibold border border-[#d0d0d5] text-[#333] hover:bg-white transition ${className}`
            }
            {...props}
        >
            {children}
        </button>
    );
}