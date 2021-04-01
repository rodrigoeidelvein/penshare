import "tailwindcss/tailwind.css";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import LoginPage from "./Login";
import AuthContext, {AuthProvider} from './contexts/auth';
import LoggedHomePage from "./LoggedHomePage";
import Navigation from "./Navigation";

function App() {

    return (
        <Router>
            <AuthProvider>
                <div>
                    <Switch>
                        <Route path="/sobre">
                            Olá, nós somos alunos da FTEC do curso de Análise e Desenvolvimento
                            de Sistemas e estamos criando esse sistema para o nosso trabalho de
                            conclusão.
                        </Route>
                        <Route path="/entrar">
                            <LoginPage/>
                        </Route>
                        <Route path="/">
                            <AuthContext.Consumer>
                                {({isSigned}) => {
                                    return isSigned ? <LoggedHomePage /> : <HomePage/>
                                }}
                            </AuthContext.Consumer>
                        </Route>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
