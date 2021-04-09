import React, {useContext} from "react";
import AuthContext from "./contexts/auth";
import {GoogleLogout} from "react-google-login";
import {faFolderOpen, faFolderPlus, faHome, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useRouteMatch} from 'react-router-dom';

const LoggedSideNavigation: React.FC = () => {
    const {path, url} = useRouteMatch();

    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;

    const successGoogleLogoutResponse = () => {
        logOut();
    };

    const {user, logOut} = useContext(AuthContext);

    console.log(url)

    return (
        <div className="relative h-screen flex flex-col w-64 bg-gray-900 h-full shadow-lg" id="loggedNav">
            <div className="flex items-center pl-6 h-20 border-b border-gray-800">
                <img src={user.photo} alt="User Photo"
                     className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"/>
                <div className="ml-1">
                    <p className="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">{user.fullName}</p>
                    <div className="badge">
                        <span
                            className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Free</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-6 space-y-1">
                    <li className="px-5">
                        <div
                            className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Dashboard
                        </div>
                    </li>
                    <li>
                        <NavLink to={`/`} exact
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