import PopularPadsContext, {PopularPadsProvider} from "../contexts/PopularPads";
import {Pad} from "../interfaces";
import CardPadHorizontal from "./CardPadHorizontal";
import {InputAdornment, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ChangeEvent, useState} from "react";

const MostPopularPads: React.FC = () => {
    const [search, setSearch] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const clearSearch = () => {
        setSearch("");
    }

    return (<div className="p-8">
        <PopularPadsProvider>
            <div className="my-5 font-bold text-lg"><h1>Documentos mais populares</h1></div>
            <div className="py-5">
                <TextField label="Filtrar" value={search} onChange={handleChange} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faSearch}/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment onClick={clearSearch} className="cursor-pointer" position="end">
                            <FontAwesomeIcon icon={faTimes}/>
                        </InputAdornment>
                    )
                }}/>
            </div>
            <div className="flex flex-wrap">
                <PopularPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads
                                .filter((pad: Pad) => pad.title?.includes(search))
                                .map((pad: Pad) => <CardPadHorizontal showOptions={false} pad={pad} key={pad.id}
                                                                      author={pad.user}/>)
                        }

                        return <div>Nenhum documento foi criado publicamente.</div>
                    }}
                </PopularPadsContext.Consumer>
            </div>
        </PopularPadsProvider>
    </div>);
}

export default MostPopularPads;
