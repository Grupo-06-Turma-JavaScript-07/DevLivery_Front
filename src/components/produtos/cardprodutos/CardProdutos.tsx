
const PriceBadge = ({ price, old, className }: { price: number; old?: number; className?: string }) => (
  <div className={`rounded-full px-4 py-3 text-center shadow-md font-semibold text-white ${className}`}>
    <div className="text-xs opacity-90">PRICE</div>
    <div className="text-lg leading-none">₹ {price}</div>
    {old && <div className="text-[11px] line-through opacity-90">₹ {old}</div>}
  </div>
);

const Rating = ({ value = 4.5 }) => (
  <div className="flex items-center gap-1 text-[#5b5b5b]">
    {Array(5).fill(0).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-[#f59e0b]" viewBox="0 0 24 24">
        <path d="M12 2l2.92 5.92 6.54.95-4.73 4.61 1.12 6.52L12 17.77 6.15 20l1.12-6.52L2.54 8.87l6.54-.95L12 2z"/>
      </svg>
    ))}
    <span className="ml-2 text-sm font-medium">{value}</span>
  </div>
);

const ProductCard = ({ name, category, image, price, oldPrice, bgColor }: {
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  bgColor: string;
}) => (
  <div className="relative rounded-2xl shadow-lg bg-white overflow-hidden border border-gray-200 hover:scale-105 transition">
    <div className="absolute top-4 right-4">
      <PriceBadge price={price} old={oldPrice} className={bgColor} />
    </div>
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <p className="text-xs uppercase text-gray-500">{category}</p>
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="mt-1"><Rating /></div>
      <button className="mt-3 w-full bg-[#7d8d2a] text-white font-semibold py-2 rounded-lg hover:brightness-110">
        Comprar
      </button>
    </div>
  </div>
);

export default function Produtos() {
  const produtos = [
    {
      name: "Chawal",
      category: "Jeera",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
      price: 180,
      oldPrice: 260,
      bgColor: "bg-[#7d8d2a]"
    },
    {
      name: "Chicken",
      category: "Kofta",
      image: "https://images.unsplash.com/photo-1617195737490-7e0cf3b1b01d?q=80&w=600&auto=format&fit=crop",
      price: 220,
      oldPrice: 260,
      bgColor: "bg-[#e7a545]"
    },
    {
      name: "Paneer",
      category: "Palak",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229f3d5?q=80&w=600&auto=format&fit=crop",
      price: 200,
      oldPrice: 260,
      bgColor: "bg-[#7d8d2a]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f0eff2] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl my font-bold uppercase text-[#7d8d2a] font-anton text-center">
                Nossos Produtos
            </h2>

            <h4 className="text-1xl lg:text-1xl my-15 text-gray-700 font-anton text-center mt-7 mb-8">
                Experimente o que há de mais saboroso e saudável
            </h4>

        <div className="grid md:grid-cols-3 gap-8">
          {produtos.map((prod, idx) => (
            <ProductCard key={idx} {...prod} />
          ))}
        </div>
      </div>
    </div>
  );
}