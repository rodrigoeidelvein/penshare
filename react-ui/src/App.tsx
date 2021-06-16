import "tailwindcss/tailwind.css";
import Home from "./pages/HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/Login";
import AuthContext, {AuthProvider} from "./contexts/auth";
import LoggedHomePage from "./pages/LoggedHomePage";

function App() {

    return (
        <Router>
            <AuthProvider>
                <div className="h-full">
                    <Switch>
                        <Route path="/sobre">
                            Olá, nós somos alunos da FTEC do curso de Análise e Desenvolvimento
                            de Sistemas e estamos criando esse sistema para o nosso trabalho de
                            conclusão.
                        </Route>
                        <Route path="/entrar">
                            <LoginPage/>
                        </Route>
                        <AuthContext.Consumer>
                            {({isSigned}) => {
                                return isSigned ? (<Route path=""><LoggedHomePage/></Route>) : (
                                    <Route path=""><Home/></Route>)
                            }}
                        </AuthContext.Consumer>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
