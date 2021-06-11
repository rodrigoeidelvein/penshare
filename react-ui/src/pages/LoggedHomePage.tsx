import LoggedSideNavigation from "../components/LoggedSideNavigation";
import Dashboard from '../components/Dashboard';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import PadsCriadosUsuario from "./PadsCriadosUsuario";
import TextEditor from "../components/TextEditor";
import SuggestionsReceived from "./SuggestionsReceived";
import SuggestionEditor from "./SuggestionEditor";

const LoggedHomePage: React.FC = () => {
    const {path} = useRouteMatch();

    return (
        <div className="min-h-full h-auto flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
            <LoggedSideNavigation/>
            <div className="w-full">
                <Switch>
                    <Route exact path={path}>
                        <Dashboard/>
                    </Route>
                    <Route path="/criados">
                        <PadsCriadosUsuario/>
                    </Route>
                    <Route path="/compartilhados">
                        Compartilhados comigo
                    </Route>
                    <Route path="/sugestoes">
                        <SuggestionsReceived title="Sugestões pendentes" status="PENDING" />
                        <SuggestionsReceived title="Sugestões aprovadas" status="APPROVED" />
                        <SuggestionsReceived title="Sugestões rejeitadas" status="REJECTED" />
                    </Route>
                    <Route path="/p/:padId">
                        <TextEditor />
                    </Route>
                    <Route path="/sugestao/:suggestionId">
                        <SuggestionEditor />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default LoggedHomePage;