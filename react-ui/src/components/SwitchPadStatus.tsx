import {Grid, Switch} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Pad} from "../interfaces";

interface IProps {
    initial: boolean,
    padId: string
}

const SwitchPadStatus: React.FC<IProps> = ({initial, padId}) => {
    const [isPrivate, setIsPrivate] = useState(initial);

    useEffect(() => {
        setIsPrivate(initial);
    }, [initial]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;

        const type = checked ? "PRIVATE" : "PUBLIC";
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/type/${padId}`, {
            body: JSON.stringify({type}),
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const resInfo: Pad = await res.json();

        setIsPrivate(resInfo.type === "PRIVATE");
    }

    return (
        <Grid component="label" container spacing={1} justify="flex-end">
            <Grid item>Público</Grid>
            <Grid item>
                <Switch checked={isPrivate} name="Tipo do Documento" onChange={handleChange}/>
            </Grid>
            <Grid item>Privado</Grid>
        </Grid>)
}

export default SwitchPadStatus;