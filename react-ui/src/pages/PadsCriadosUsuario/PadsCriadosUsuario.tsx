import CardPadHorizontal from "../../components/CardPadHorizontal";
import {ChangeEvent, useContext, useState} from "react";
import AuthContext from "../../contexts/auth";
import {Pad} from "../../interfaces";
import {useHistory} from "react-router-dom";
import UserPadsContext, {UserPadsProvider} from "../../contexts/UserPads";
import {Input, InputAdornment, InputLabel, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

const PadsCriadosUsuario: React.FC = () => {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const [search, setSearch] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const clearSearch = () => {
        setSearch("");
    }

    return (<div className="p-6">
        <UserPadsProvider>
            <div className="my-5 font-bold text-lg w-full"><h1>Criados por você</h1></div>
            <div className="my-5">
                <TextField label="Filtrar" value={search} onChange={handleChange} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faSearch} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment onClick={clearSearch} className="cursor-pointer" position="end">
                            <FontAwesomeIcon icon={faTimes} />
                        </InputAdornment>
                    )
                }} />
            </div>
            <div className="flex flex-wrap">
                <UserPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads.filter((pad: Pad) => pad.title?.includes(search)).map((pad: Pad) =>
                                <CardPadHorizontal showOptions={true} pad={pad} key={pad.id}
                                                   author={user}/>)
                        }

                        return <div>Você ainda não criou nenhum documento</div>
                    }}
                </UserPadsContext.Consumer>
            </div>
        </UserPadsProvider>
    </div>);
}

export default PadsCriadosUsuario;