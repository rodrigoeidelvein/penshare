import React, {useContext} from "react";
import AuthContext from "../contexts/auth";
import {GoogleLogout} from "react-google-login";
import {faBell, faFolderOpen, faFolderPlus, faHome, faPlus, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useHistory} from 'react-router-dom';
import {Pad} from "../interfaces";
import {Badge} from "@material-ui/core";

interface PadResponse {
    pad: Pad
}

const LoggedSideNavigation: React.FC = () => {
    const history = useHistory();

    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;

    const successGoogleLogoutResponse = () => {
        logOut();
    };

    const createPad = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            const createdPadData = await res.json() as PadResponse;
            const newPad: Pad = createdPadData.pad;
            history.push(`/p/${newPad.id}`);
        }
    }

    const isPremium = (premium: boolean) => {
        return premium ? "Premium" : "Free";
    }

    const {user, logOut, suggestionsPending} = useContext(AuthContext);

    return (
        <div className="relative h-screen flex flex-col w-64 bg-gray-900 h-full shadow-lg">
            <div className="flex items-center pl-6 h-20 border-b border-gray-800">
                <img src={user.photo} alt={`Avatar of ${user.fullName}`}
                     className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"/>
                <div className="ml-1">
                    <p className="ml-1 text-md font-medium tracking-wide break-words text-gray-100 font-sans">{user.fullName}</p>
                    <div className="badge">
                        <span
                            className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">{isPremium(user.premium)}</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-6 space-y-1">
                    <li>
                        <a
                            className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                            onClick={createPad}>
                            <span className="inline-flex justify-center items-center ml-4">
                                <FontAwesomeIcon icon={faPlus}/>
                            </span>
                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Criar documento</span>
                        </a>
                    </li>
                    <li className="px-5">
                        <div
                            className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Dashboard
                        </div>
                    </li>
                    <li>
                        <NavLink to="/" exact
                                 activeClassName="text-gray-200 bg-gray-700 border-blue-500"
                                 className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <FontAwesomeIcon icon={faHome}/>
                                </span>
                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Início</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/criados"
                                 activeClassName="text-gray-200 bg-gray-700 border-blue-500"
                                 className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                               <span className="inline-flex justify-center items-center ml-4">
                                   <FontAwesomeIcon icon={faFolderOpen}/>
                               </span>
                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Criados por você</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/compartilhados"
                                 activeClassName="text-gray-200 bg-gray-700 border-blue-500"
                                 className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                               <span className="inline-flex justify-center items-center ml-4">
                                   <FontAwesomeIcon icon={faFolderPlus}/>
                                </span>
                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Compartilhados com você</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sugestoes"
                                 activeClassName="text-gray-200 bg-gray-700 border-blue-500"
                                 className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                               <span className="inline-flex justify-center items-center ml-4">
                                   <Badge badgeContent={suggestionsPending} color="primary">
                                    <FontAwesomeIcon icon={faBell}/>
                                   </Badge>
                                </span>
                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Sugestões recebidas</span>
                        </NavLink>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div
                                className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Configurações
                            </div>
                        </div>
                    </li>
                    <li>
                        <GoogleLogout clientId={clientId} onLogoutSuccess={successGoogleLogoutResponse}
                                      render={renderProps => (
                                          <button onClick={renderProps.onClick}
                                                  className="w-full w-auto relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6">
                                            <span className="inline-flex justify-center items-center ml-4 text-red-400">
                                                <FontAwesomeIcon icon={faSignOutAlt}/>
                                            </span>
                                              <span
                                                  className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Sair</span>
                                          </button>
                                      )}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LoggedSideNavigation;