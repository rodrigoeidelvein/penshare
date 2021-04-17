import {faChevronDown, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MouseEvent, useContext} from "react";
import './dropdown.css'
import UserPadsContext from "../../contexts/UserPads";

const Dropdown: React.FC<{ padId: string }> = ({ padId }) => {
    const { getUserPads } = useContext(UserPadsContext)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    }

    const handleDelete = (event: MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();

        if (window.confirm("Você tem certeza que quer excluir esse documento?")) {
            deletePad();
        }
    }

    const deletePad = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}`, {
                method: "DELETE",
                credentials: "include"
            });

            getUserPads();
        } catch(e) {
            console.error(e);
            console.log('Erro ao excluir documento.');
        }
    }

    return (<div className="bg-white py-1 flex flex-col justify-center sm:py-1">
        <div className="flex items-center justify-center p-1">
            <div className="relative inline-block text-left dropdown">
                <span className="rounded-md shadow-sm">
                    <button
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-label="Mais ações. Botão pop-up."
                        onClick={handleClick}
                    >
                        <span>...</span>
                        <FontAwesomeIcon icon={faChevronDown} className="top-1 left-1" />
                    </button>
                </span>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                    <div className="absolute right-0 w-36 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" role="menu">
                        <a className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                            <span>Excluir</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Dropdown;