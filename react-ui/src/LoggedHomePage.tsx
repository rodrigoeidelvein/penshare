import LoggedSideNavigation from "./LoggedSideNavigation";
import TextEditor from "./TextEditor";
import Dashboard from './Dashboard';

const LoggedHomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
            <LoggedSideNavigation />
            <Dashboard />
        </div>
    )
}

export default LoggedHomePage;