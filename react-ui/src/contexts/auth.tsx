import {createContext, useState} from "react";
import {cookieExists, deleteCookie, setCookie} from "../utils";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {useHistory} from 'react-router-dom';
import useSWR, {mutate} from "swr";
import { User } from "../interfaces";

interface AuthContextData {
    isSigned: boolean;
    user: User;
    error: any;
    suggestionsPending: number,

    logIn(googleData: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void>;

    logOut(): void;
}

const AuthContext = createContext<AuthContextData>(({} as AuthContextData));

export const AuthProvider: React.FC = ({children}) => {
    let history = useHistory();
    const [user, setUser] = useState({} as User);

    const fetcher = async (url: string) => {
        const res: Response = await fetch(url, {
            credentials: "include"
        })

        if (res.status === 401) {
            deleteCookie('token');
            window.location.reload();
        }

        if (!res.ok) {
            const error: any = new Error(res.statusText);
            error.info = await res.json();
            error.status = res.status;
            throw error;
        }

        return await res.json();
    }

    const {data, error} = useSWR(cookieExists('token') ? `${process.env.REACT_APP_API_ENDPOINT}api/auth/me` : null, fetcher)

    const {data: suggestionsPending, error: suggestionsError} = useSWR(data ? `${process.env.REACT_APP_API_ENDPOINT}api/suggestion?user=${data.id}&status=PENDING` : null, fetcher)

    async function logIn(googleData: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (!("googleId" in googleData)) {
            return;
        }

        setCookie('token', googleData.tokenId);

        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/auth/`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({token: googleData.tokenId}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            await mutate(`${process.env.REACT_APP_API_ENDPOINT}api/auth/me`, (data: any) => {
                setUser(data)
            })
            history.push('/');
        }
    }

    const logOut = async () => {
        await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/auth/`, {
            method: "DELETE"
        });

        deleteCookie('token');
        await mutate(`${process.env.REACT_APP_API_ENDPOINT}api/auth/me`, (data: any) => {
            setUser({} as User);
        })
    }

    const suggestionsPendingLength = suggestionsPending ? suggestionsPending.length : 0;

    return (
        <AuthContext.Provider value={{isSigned: !!data, error, user: data, logIn, logOut, suggestionsPending: suggestionsPendingLength}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;