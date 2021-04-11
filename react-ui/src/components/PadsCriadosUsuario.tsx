import CardPadHorizontal from "./CardPadHorizontal";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {User} from "../contexts/auth";
import {Pad} from "./CardPad";
import {useHistory} from "react-router-dom";

export interface UserPadsResponse extends User {
    pads: Pad[]
}

const PadsCriadosUsuario: React.FC = () => {
    const [pads, setPads] = useState([] as Pad[]);
    const [user, setUser] = useState({} as User);
    const history = useHistory();

    useEffect(() => {
        async function getUserPads () {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/user/`, {
                    method: "GET",
                    credentials: "include"
                });

                const userPads = await res.json() as UserPadsResponse;
                console.log(userPads)
                setUser(userPads)
                setPads(userPads.pads);
            } catch (e) {
                console.error(e);
                console.error('Erro buscando pads do usuário');
            }
        }

        getUserPads();
    }, []);

    const createPad = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            const newPad = await res.json() as Pad;
            history.push(`/p/${newPad.id}`);
        }
    }

    return (<div className="p-6">
        <Button text="Criar" icon={faPlus} onClick={createPad}/>
        <div className="my-5 font-bold text-lg"><h1>Criados por você</h1></div>
        <div className="flex flex-wrap">
            {pads.map((pad: Pad) => <CardPadHorizontal pad={pad} key={pad.id} author={user}/>)}
        </div>
    </div>);
}

export default PadsCriadosUsuario;