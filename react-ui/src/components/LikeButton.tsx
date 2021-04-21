import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as regularFaThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {MouseEvent, useState} from "react";

interface ILike {
    liked: boolean,
    likeCount: number
}

const LikeButton: React.FC<{ likes: number, liked: boolean, padId: string }> = ({likes, liked, padId}) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}/like`, {
            method: "POST",
            credentials: "include"
        });

        const likeData = await res.json() as ILike;
        setLikeCount(likeData.likeCount);
        setIsLiked(likeData.liked);
    }

    return (<div className="flex border rounded-sm clear-both p-1">
        <button
            type="button"
            aria-label="Curtir"
            className="inline-flex justify-center w-full leading-5 font-medium text-sm focus:outline-none"
            onClick={handleClick}
        >
            <div className="w-2/4">
                {isLiked ? <FontAwesomeIcon icon={faThumbsUp}/> : <FontAwesomeIcon icon={regularFaThumbsUp}/>}
             </div>
            <div>{likeCount}</div>
        </button>
    </div>)
}

export default LikeButton;
