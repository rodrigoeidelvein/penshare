import {Pad} from "./CardPad";
import {User} from "../contexts/auth";
import {useHistory} from "react-router-dom";

const CardPadHorizontal: React.FC<{pad:Pad, author: User}> = ({ pad, author }) => {
    const history = useHistory();
    const months: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    const formatDay = (day: number) => {
        return day < 10 ? `0${day}` : day;
    }

    const formatDate = (date: string) => {
        const dateObject: Date = new Date(date);
        return `${formatDay(dateObject.getDate())} de ${months[dateObject.getMonth()]} de ${dateObject.getFullYear()}`
    }

    const navigateToEditor = () => {
        history.push(`/p/${pad.id}`);
    }

    return (<div className="duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer max-w-full w-96 h-auto lg:flex text-sm rounded-2xl mr-5 mb-5" onClick={navigateToEditor}>
            <div
            className="w-full border-r border-b border-l border-gray-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <div className="text-black font-bold text-lg mb-2">{pad.title}</div>
                <p className="text-grey-darker text-sm break-words">{pad.rawContent && pad.rawContent.substring(0, 20)}</p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4"
                     src={author.photo}
                     alt={`Avatar de ${author.fullName}`} />
                    <div className="text-sm">
                        <p className="text-black leading-none">{pad.author}</p>
                        <p className="text-grey-dark">{formatDate(pad.createdAt)}</p>
                    </div>
            </div>
        </div>
    </div>);
}

export default CardPadHorizontal;