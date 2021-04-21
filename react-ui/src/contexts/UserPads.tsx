import {createContext, useEffect, useState} from "react";
import {Pad} from "../components/CardPad";

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

        const userPads = await res.json() as Pad[];
        setPads(userPads);
    }

    return (<UserPadsContext.Provider value={{pads, getUserPads}}>
        {children}
    </UserPadsContext.Provider>)
}

export default UserPadsContext;