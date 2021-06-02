import PopularPadsContext, {PopularPadsProvider} from "../contexts/PopularPads";
import {Pad} from "./CardPad";
import CardPadHorizontal from "./CardPadHorizontal";

const MostPopularPads: React.FC = () => {
    return (<div className="p-8">
        <PopularPadsProvider>
            <div className="my-5 font-bold text-lg"><h1>Documentos mais populares</h1></div>
            <div className="flex flex-wrap">
                <PopularPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads.map((pad: Pad) => <CardPadHorizontal showOptions={false} pad={pad} key={pad.id} author={pad.user}/>)
                        }

                        return <div>Nenhum documento foi criado publicamente.</div>
                    }}
                </PopularPadsContext.Consumer>
            </div>
        </PopularPadsProvider>
    </div>);
}

export default MostPopularPads;
