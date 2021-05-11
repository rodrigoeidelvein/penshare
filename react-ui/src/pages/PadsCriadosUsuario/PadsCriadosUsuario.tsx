import CardPadHorizontal from "../../components/CardPadHorizontal";
import MyButton from "../../components/MyButton";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import AuthContext from "../../contexts/auth";
import {Pad} from "../../components/CardPad";
import {useHistory} from "react-router-dom";
import UserPadsContext, {UserPadsProvider} from "../../contexts/UserPads";
import {Modal} from "@material-ui/core";
import SharePadDialog from "../../components/SharePadDialog/SharePadDialog";


const PadsCriadosUsuario: React.FC = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

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
        <UserPadsProvider>
            <MyButton text="Criar" icon={faPlus} onClick={createPad}/>
            <div className="my-5 font-bold text-lg"><h1>Criados por você</h1></div>
            <div className="flex flex-wrap">
                <UserPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads.map((pad: Pad) => <CardPadHorizontal showOptions={true} pad={pad} key={pad.id} author={user}/>)
                        }

                        return <div>Você ainda não criou nenhum documento</div>
                    }}
                </UserPadsContext.Consumer>
            </div>
        </UserPadsProvider>
    </div>);
}

export default PadsCriadosUsuario;