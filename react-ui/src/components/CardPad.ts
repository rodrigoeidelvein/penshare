import {User} from "../contexts/auth";
import {PadType} from "../enums";

export interface Pad {
    id: string,
    content?: string,
    rawContent?: string,
    title?: string,
    updatedAt: string,
    createdAt: string,
    userId: string,
    author: User
    type: PadType,
    likesCount: number,
    liked?: boolean
}

export interface CardPadProps {
    pad: Pad,
    author: User,
    showOptions: boolean
}