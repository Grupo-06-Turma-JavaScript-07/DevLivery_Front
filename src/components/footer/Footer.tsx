function Footer() {
    return (
        <footer className="bg-[#7d8d2a]">
            <div className="max-w-7xl mx-auto px-4 py-10 text-center text-sm text-[#4b4b4b]">
                
                {/* Links de Navegação */}
                <div className="flex items-center text-[#f1f1f3] justify-center gap-4 mb-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Sobre Nós</a>
                    <a href="#" className="hover:underline">Blog</a>
                    <a href="#" className="hover:underline">Contato</a>
                    <a href="#" className="hover:underline">Política de Devolução</a>
                </div>

                {/* Container para centralizar o Logo e o Copyright */}
                <div className="flex items-center justify-center text-[#f1f1f3] gap-2 mt-4">
                   
                    
                    {/* Texto de Copyright */}
                    <p>Copyright © {new Date().getFullYear()} DevLivery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;