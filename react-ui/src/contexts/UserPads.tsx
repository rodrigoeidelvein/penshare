import {createContext, useEffect, useState} from "react";
import {Pad} from "../components/CardPad";

export interface UserPadsResponse {
    pads: Pad[]
}

interface UserPadsContextData {
    pads: Pad[],
    getUserPads: () => void
}

const UserPadsContext = createContext<UserPadsContextData>({} as UserPadsContextData);

export const UserPadsProvider: React.FC = ({ children }) => {
    const [pads, setPads] = useState([] as Pad[])

    useEffect(() => {
        getUserPads();
    }, [])

    async function getUserPads() {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/user/`, {
            method: "GET",
            credentials: "include"
        });

        const userPads = await res.json() as UserPadsResponse;
        setPads(userPads.pads);
    }

    return (<UserPadsContext.Provider value={{pads, getUserPads}}>
        {children}
    </UserPadsContext.Provider>)
}

export default UserPadsContext;