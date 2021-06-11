import CardPadHorizontal from "../../components/CardPadHorizontal";
import Button from "../../components/Button";
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

    return (<div className="p-6">
        <UserPadsProvider>
            <div className="my-5 font-bold text-lg w-full"><h1>Criados por você</h1></div>
            <div className="flex flex-wrap">
                <UserPadsContext.Consumer>
                    {({pads}) => {
                        if (pads.length) {
                            return pads.map((pad: Pad) => <CardPadHorizontal showOptions={true} pad={pad} key={pad.id} author={user} />)
                        }

                        return <div>Você ainda não criou nenhum documento</div>
                    }}
                </UserPadsContext.Consumer>
            </div>
        </UserPadsProvider>
    </div>);
}

export default PadsCriadosUsuario;