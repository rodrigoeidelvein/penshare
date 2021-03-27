import "tailwindcss/tailwind.css";
import logo from "./logo.svg";
import TextEditor from "./TextEditor";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
                <Link to="/editor">Entrar</Link>
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
          <Route path="/editor">
            <TextEditor />
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
