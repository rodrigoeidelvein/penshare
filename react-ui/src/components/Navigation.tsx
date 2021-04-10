import {Link} from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <div>
            <nav className="flex flex-row-reverse pt-3">
                <ul>
                    <li className="inline mr-4 p-3">
                        <Link to="">Início</Link>
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
    )
}

export default Navigation;