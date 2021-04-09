import LoggedSideNavigation from "../components/LoggedSideNavigation";
import Dashboard from '../components/Dashboard';
import {Route, Switch, useRouteMatch} from "react-router-dom";

const LoggedHomePage: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <div className="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
            <LoggedSideNavigation />
            <Switch>
                <Route exact path={path}>
                    <Dashboard />
                </Route>
                <Route path={`/criados`}>
                    Criados por mim
                </Route>
                <Route path={`/compartilhados`}>
                    Compartilhados comigo
                </Route>
            </Switch>
        </div>
    )
}

export default LoggedHomePage;