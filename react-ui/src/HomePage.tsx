import HomeContainer from "./HomeContainer";
import logo from "./logo.svg";
import Navigation from "./Navigation";

function HomePage() {
    return (
        <div className="container mx-auto">
            <Navigation/>
            <HomeContainer>
                <div className="mx-3 text-6xl inline app-name relative">
                    <span className="absolute bottom-0 right-0 app-name">Penshare</span>
                </div>
                <img className="inline h-16" src={logo} alt="Logo Penshare"/>
            </HomeContainer>
        </div>
    );
}

export default HomePage;
