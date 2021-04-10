import LoggedSideNavigation from "../components/LoggedSideNavigation";
import Dashboard from '../components/Dashboard';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import PadsCriadosUsuario from "../components/PadsCriadosUsuario";

const LoggedHomePage: React.FC = () => {
    const {path} = useRouteMatch();

    return (
        <div className="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
            <LoggedSideNavigation/>
            <div className="p-8">
                <Switch>
                    <Route exact path={path}>
                        <Dashboard/>
                    </Route>
                    <Route path={`/criados`}>
                        <PadsCriadosUsuario/>
                    </Route>
                    <Route path={`/compartilhados`}>
                        Compartilhados comigo
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default LoggedHomePage;