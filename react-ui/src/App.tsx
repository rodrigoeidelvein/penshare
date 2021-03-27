import "tailwindcss/tailwind.css";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./Login";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <div>
          <nav className="flex flex-row-reverse pt-3">
            <ul>
              <li className="inline mr-4 p-3">
                <Link to="/">Início</Link>
              </li>
              <li className="inline mr-4 p-3">
                <Link to="/entrar">Entrar</Link>
              </li>
              <li className="inline p-3">
                <Link to="/sobre">Sobre</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/sobre">
            Olá, nós somos alunos da FTEC do curso de Análise e Desenvolvimento
            de Sistemas e estamos criando esse sistema para o nosso trabalho de
            conclusão.
          </Route>
          <Route path="/entrar">
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
