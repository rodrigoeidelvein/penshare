import {Pad} from './MostPopularPads'

const CardPad: React.FC<{pad:Pad}> = ({children, pad}) => {
    return (<div className="w-1/2 h-auto rounded overflow-hidden shadow-lg my-2">
        <img className="w-full" alt="lorem ipsum" src={pad.image} />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{pad.name}</div>
            <p className="text-grey-darker text-base">
                {pad.description}
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