import {Pad} from "./MostPopularPads";

const CardPadHorizontal: React.FC<{pad:Pad}> = ({ pad }) => {
    return (<div className="max-w-full w-96 h-auto lg:flex text-sm rounded-2xl mx-5">
                <div
                    className="h-36 lg:h-auto lg:w-36 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{backgroundImage: `url(${pad.image})`}} title={pad.name}>
                </div>
            <div
            className="w-full border-r border-b border-l border-gray-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <div className="text-black font-bold text-lg mb-2">{pad.name}</div>
                <p className="text-grey-darker text-sm break-words">{pad.description}</p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4"
                     src={pad.authorPicture}
                     alt={`Avatar de ${pad.author}`} />
                    <div className="text-sm">
                        <p className="text-black leading-none">{pad.author}</p>
                        <p className="text-grey-dark">{pad.createdAt}</p>
                    </div>
            </div>
        </div>
    </div>);
}

export default CardPadHorizontal;