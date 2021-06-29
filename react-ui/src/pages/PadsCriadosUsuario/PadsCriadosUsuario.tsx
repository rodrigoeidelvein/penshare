import CardPadHorizontal from "../../components/CardPadHorizontal";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/auth";
import {Category, Pad} from "../../interfaces";
import {useHistory} from "react-router-dom";
import {InputAdornment, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Autocomplete} from "@material-ui/lab";
import {filterByCategory, filterByName} from "../../utils";

const PadsCriadosUsuario: React.FC = () => {
    const {user} = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [pads, setPads] = useState<Pad[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesSearch, setCategoriesSearch] = useState([]);

    useEffect(() => {
        const getMostPopularPads = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/user/`, {
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
    },[]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const clearSearch = () => {
        setSearch("");
    }

    const handleAutocompleteChange = (event: any, newValue: any) => {
        setCategoriesSearch(newValue);
    }

    const shouldRenderPads = () => {
        if (!pads.length) {
            return <div>Você ainda não criou nenhum documento</div>
        }

        return pads
                .filter(pad => filterByName(pad, search))
                .filter(pad => filterByCategory(pad, categoriesSearch))
                .map((pad: Pad) =>
                <CardPadHorizontal showOptions={true} pad={pad} key={pad.id}
                                   author={user}/>)
    }

    return (<div className="p-6">
        <div className="my-5 font-bold text-lg w-full"><h1>Criados por você</h1></div>
        <div className="my-5">
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

export default PadsCriadosUsuario;