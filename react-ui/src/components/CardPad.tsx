import {User} from "../contexts/auth";

export interface Pad {
    id: string,
    content?: string,
    rawContent?: string,
    title?: string,
    updatedAt: string,
    createdAt: string,
    userId: string,
    author: User
}

const CardPad: React.FC<{pad:Pad}> = ({children, pad}) => {
    return (<div className="w-1/2 h-auto rounded overflow-hidden shadow-lg my-2">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{pad.title}</div>
            <p className="text-grey-darker text-base">
                {pad.content?.substring(0, 20)}...
            </p>
        </div>
        <div className="px-6 py-4">
            <span
                className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
            <span
                className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
            <span
                className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
        </div>
    </div>);
}


export default CardPad;