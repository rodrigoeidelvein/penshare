import {Category, Pad} from "../interfaces";
import CardPadHorizontal from "./CardPadHorizontal";
import {InputAdornment, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {filterByCategory, filterByName} from "../utils";

const MostPopularPads: React.FC = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesSearch, setCategoriesSearch] = useState([]);
    const [pads, setPads] = useState([] as Pad[]);

    useEffect(() => {
        const getMostPopularPads = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/popular/`, {
                method: "GET",
                credentials: "include"
            });

            const popularPads = await res.json() as Pad[];
            setPads(popularPads);
        }

        const getCategories = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/category/`, {
                method: "GET",
                credentials: "include"
            });

            const categoriesResult = await res.json() as Category[];
            setCategories(categoriesResult);
        }

        async function fetchData() {
            await getMostPopularPads();
            await getCategories();
        }

        fetchData();
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toUpperCase());
    }

    const clearSearch = () => {
        setSearch("");
    }

    const handleAutocompleteChange = (event: any, newValue: any) => {
        setCategoriesSearch(newValue);
    }

    const shouldRenderPads = () => {
        if (!pads.length) {
            return <div>Nenhum documento foi criado publicamente.</div>
        }

        return pads
            .filter(pad => filterByName(pad, search))
            .filter(pad => filterByCategory(pad, categoriesSearch))
            .map((pad: Pad) => <CardPadHorizontal showOptions={false} pad={pad} key={pad.id}
                                                  author={pad.user}/>)
    }

    return (<div className="p-8">
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
                value={categoriesSearch}
                options={categories}
                getOptionLabel={(option) => option.name}
                onChange={handleAutocompleteChange}
                size="small"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Categorias"
                        placeholder="Categorias"/>
                )}
            />
        </div>
        <div className="flex flex-wrap">
            {shouldRenderPads()}
        </div>
    </div>);
}

export default MostPopularPads;
