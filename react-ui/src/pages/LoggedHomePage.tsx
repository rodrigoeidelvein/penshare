import LoggedSideNavigation from "../components/LoggedSideNavigation";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import PadsCriadosUsuario from "./PadsCriadosUsuario";
import TextEditor from "../components/TextEditor";
import SuggestionsReceived from "./SuggestionsReceived";
import SuggestionEditor from "./SuggestionEditor";
import PadsList from "./PadsList";
import PadPage from "./Pad";

const LoggedHomePage: React.FC = () => {
    const {path} = useRouteMatch();

    return (
        <div className="min-h-full h-auto flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
            <LoggedSideNavigation/>
            <div className="w-full">
                <Switch>
                    <Route exact path={path}>
                        <PadsList title="Documentos mais populares" type="popular" showOptions={false} emptyMessage="Nenhum documento criado ainda." />
                    </Route>
                    <Route path="/criados">
                        <PadsList title="Criados por você" type="user" showOptions emptyMessage="Você ainda não criou nenhum documento." />
                    </Route>
                    <Route path="/compartilhados">
                        <PadsList title="Compartilhados com você" type="shared/user" showOptions={false} emptyMessage="Nenhum documento foi compartilhado com você ainda" />
                    </Route>
                    <Route path="/sugestoes">
                        <SuggestionsReceived title="Sugestões pendentes" status="PENDING" />
                        <SuggestionsReceived title="Sugestões aprovadas" status="APPROVED" />
                        <SuggestionsReceived title="Sugestões rejeitadas" status="REJECTED" />
                    </Route>
                    <Route path="/p/:padId">
                        <PadPage />
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