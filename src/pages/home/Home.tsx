import Principal from "../principal/Principal";
import Produtos from "../produtos/Produtos";
import SobreNos from "../sobrenos/SobreNos";
import Equipe from "../equipe/Equipe";

function Home() {
    return (
        <>
            <Principal />


            <div id="produtos">
                <Produtos />
            </div>


            <div id="sobrenos">
                <SobreNos />
            </div>

            <div id="equipe">
                <Equipe />
            </div>
        </>
    );
}

export default Home;