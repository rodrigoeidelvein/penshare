import PopularPadsContext, {PopularPadsProvider} from "../contexts/PopularPads";
import {Pad} from "../interfaces";
import CardPadHorizontal from "./CardPadHorizontal";
import {InputAdornment, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ChangeEvent, useState} from "react";
import {Autocomplete} from "@material-ui/lab";

const MostPopularPads: React.FC = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toUpperCase());
    }

    const clearSearch = () => {
        setSearch("");
    }

    const handleAutocompleteChange = (event: any, newValue: any) => {
        setCategories(newValue)
    }

    const categoriesOptions = [
        {
            id: 1,
            name: "Desenvolvimento"
        },
        {
            id: 2,
            name: "Comunicação"
        },
        {
            id: 3,
            name: "Design"
        }
    ]

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
                <Autocomplete
                    multiple
                    className="mt-3 w-1/4"
                    filterSelectedOptions
                    value={categories}
                    options={categoriesOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={handleAutocompleteChange}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Categorias"
                            placeholder="Categorias" />
                    )}
                />
            </div>
            <div className="flex flex-wrap">
                <PopularPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads
                                .filter((pad: Pad) => pad.title?.toUpperCase().includes(search))
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
