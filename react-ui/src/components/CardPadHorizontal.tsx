import {CardPadProps} from "./CardPad";
import {useHistory} from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PadType} from "../enums";
import LikeButton from "./LikeButton";

const CardPadHorizontal: React.FC<CardPadProps> = ({pad, author, showOptions}) => {
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

    const renderPadType = () => {
        if (pad.type === PadType.PRIVATE) {
            return (<div><FontAwesomeIcon icon={faLock}/> Privado</div>)
        }

        return (<div><FontAwesomeIcon icon={faLockOpen}/> Público</div>)
    }

    const shouldRenderOptions = () => {
        if (showOptions) {
            return (<div className="absolute right-2 top-2">
                <Dropdown padId={pad.id}/>
            </div>)
        }

        return <></>
    }

    return (<div
        className="duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer max-w-full w-96 h-auto lg:flex text-sm rounded-2xl mr-5 mb-5"
        onClick={navigateToEditor}>
        <div
            className="w-full border-r border-b border-l border-gray-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
            <div className="mb-8">
                <div className="text-black font-bold text-lg mb-2">{pad.title}</div>
                {shouldRenderOptions()}
                <div className="absolute right-4 bottom-4 text-base">
                    {renderPadType()}
                    <LikeButton likes={pad.likesCount} liked={pad.liked ? pad.liked : false} padId={pad.id} />
                </div>
                <p className="text-grey-darker text-sm break-words">{pad.rawContent && pad.rawContent.substring(0, 50)}</p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4"
                     src={author.photo}
                     alt={`Avatar de ${author.fullName}`}/>
                <div className="text-sm">
                    <p className="text-black leading-none">{author.fullName}</p>
                    <p className="text-grey-dark">{formatDate(pad.createdAt)}</p>
                </div>
            </div>
        </div>
    </div>);
}

export default CardPadHorizontal;