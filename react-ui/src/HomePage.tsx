import HomeContainer from "./HomeContainer";
import logo from "./logo.svg";

function HomePage() {
  return (
    <HomeContainer>
      <div className="mx-3 text-6xl inline app-name relative">
        <span className="absolute bottom-0 right-0">Penshare</span>
      </div>
      <img className="inline h-16" src={logo} alt="Logo Penshare" />
    </HomeContainer>
  );
}

export default HomePage;
