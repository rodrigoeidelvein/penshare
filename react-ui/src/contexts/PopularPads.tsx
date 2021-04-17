import {Pad} from "../components/CardPad";
import {createContext, useEffect, useState} from "react";

interface PopularPadsContextData {
    pads: Pad[],
    message?: string
}

const PopularPadsContext = createContext<PopularPadsContextData>({} as PopularPadsContextData);

export const PopularPadsProvider: React.FC = ({children}) => {
    const [pads, setPads] = useState([] as Pad[]);

    useEffect(() => {
        getMostPopularPads();
    }, []);

    async function getMostPopularPads() {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/popular/`, {
            method: "GET",
            credentials: "include"
        });

        const userPads = await res.json() as Pad[];
        setPads(userPads);
    }

    return (<PopularPadsContext.Provider value={{pads}}>
        {children}
    </PopularPadsContext.Provider>)
}

export default PopularPadsContext;