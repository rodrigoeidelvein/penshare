import {CardPadProps} from "../interfaces";
import {useHistory} from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PadType} from "../enums";
import LikeButton from "./LikeButton";
import {MouseEvent} from "react";
import {formatDate} from "../utils";
import {Avatar, Chip} from "@material-ui/core";

const CardPadHorizontal: React.FC<CardPadProps> = ({pad, author, showOptions}) => {
    const history = useHistory();

    const navigateToEditor = (event: MouseEvent<HTMLDivElement>) => {
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

    const getFirstLetterUpperCase = (name: string) => {
        return name.charAt(0).toUpperCase();
    }

    const renderCategories = () => {
        if (!pad.categories.length) {
            return <></>;
        }

        return pad.categories.map(category => (
            <Chip key={category.id} variant="outlined" size="small" label={category.name} color="primary"
                  avatar={<Avatar>{getFirstLetterUpperCase(category.name)}</Avatar>}/>
        ))
    }

    return (<div
        className="duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer max-w-full w-96 h-auto lg:flex text-sm rounded-2xl mr-5 mb-5"
        onClick={navigateToEditor}>
        <div
            className="w-full border-r border-b border-l border-gray-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        >
            <div className="mb-8">
                <div className="text-black font-bold text-lg mb-2">{pad.title ? pad.title : 'Sem título'}</div>
                {shouldRenderOptions()}
                <div className="py-2">
                    {renderCategories()}
                </div>
                <div className="absolute right-4 bottom-4 text-base">
                    {renderPadType()}
                    <LikeButton likes={pad.likesCount} liked={pad.liked} padId={pad.id}/>
                </div>
                <p className="text-grey-darker text-sm break-words">{pad.rawContent && pad.rawContent.substring(0, 50)}</p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4"
                     src={author.photo}
                     alt={`Avatar de ${author.fullName}`}/>
                <div className="text-sm">
                    <p className="text-black leading-none">{author.fullName}</p>
                    <p className="text-grey-dark">{formatDate(pad.created_at)}</p>
                </div>
            </div>
        </div>
    </div>);
}

export default CardPadHorizontal;