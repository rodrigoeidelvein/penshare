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

export interface User {
    firstName: string;
    fullName: string
    email: string;
    id: string;
    photo: string;
    createdAt: string,
    updatedAt: string,
}

export interface Suggestion {
    reviewed_at?: string,
    changeSet?: string,
    comment: string,
    content: string,
    rawContent: string,
    created_at: string,
    id: number,
    idContributor: number,
    idPad: string,
    pad: Pad,
    read: boolean,
    read_at: string,
    updated_at: string,
    status: string,
    user: User
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

export interface PadResponse {
    pad: Pad,
    isOwner: boolean
}
