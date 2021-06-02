import {User} from "../contexts/auth";
import {PadType} from "../enums";

export interface Pad {
    id: string,
    content?: string,
    rawContent?: string,
    title?: string,
    updated_at: string,
    created_at: string,
    userId: string,
    user: User,
    type: PadType,
    likesCount: number,
    liked: boolean
}

export interface Authorizations {
    id: string,
    createdAt?: string,
    updatedAt?: string,
    read: boolean,
    write: boolean,
    delete: boolean
}

export interface CardPadProps {
    pad: Pad,
    author: User,
    showOptions: boolean
}