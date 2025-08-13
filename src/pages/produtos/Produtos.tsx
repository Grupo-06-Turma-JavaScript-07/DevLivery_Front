// src/pages/produtos/Produtos.tsx
import CardProduto from "../../components/produtos/cardprodutos/CardProdutos";

// Dados de exemplo para os produtos
const produtosExemplo = [
    {
        title: "Salada Caesar",
        tag: "Frango Grelhado",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
        price: 32,
        old: 40,
        variantColor: "bg-[#7d8d2a]", // Verde Oliva
    },
    {
        title: "Salmão Grelhado",
        tag: "com Legumes",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
        price: 45,
        old: 55,
        variantColor: "bg-[#e7a545]", // Laranja Vibrante
    },
    {
        title: "Bowl de Açaí",
        tag: "com Frutas",
        image: "https://ik.imagekit.io/pedrolazzz/a%C3%A7ai-crop.png?updatedAt=1755023669920",
        price: 25,
        old: 30,
        variantColor: "bg-[#7d8d2a]", // Verde Oliva
    },
];

export default function Produtos() {
    return (
        <section className="bg-white py-14">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {produtosExemplo.map((produto, index) => (
                        <CardProduto
                            key={index}
                            title={produto.title}
                            tag={produto.tag}
                            image={produto.image}
                            price={produto.price}
                            old={produto.old}
                            variantColor={produto.variantColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}