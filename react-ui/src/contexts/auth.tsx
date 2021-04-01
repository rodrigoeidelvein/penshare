import {createContext, useState} from "react";
import {cookieExists, deleteCookie, setCookie} from "../utils";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {useHistory} from 'react-router-dom';
import useSWR, {mutate} from "swr";

interface User {
    firstName: string;
    fullName: string
    email: string;
    id: string;
    photo: string;
}

interface AuthContextData {
    isSigned: boolean;
    user: User;
    error: any;

    logIn(googleData: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void>;

    logOut(): void;
}

const AuthContext = createContext<AuthContextData>(({} as AuthContextData));

const fetcher = async (url: string) => {
    const res: Response = await fetch(url, {
        credentials: "include"
    })
    console.log('chamou aqui', res.ok)
    if (!res.ok) {
        const error: any = new Error(res.statusText);
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return await res.json();
}

export const AuthProvider: React.FC = ({children}) => {
    let history = useHistory();
    const [user, setUser] = useState({} as User);

    const {data, error} = useSWR(cookieExists('token') ? 'http://localhost:5000/api/auth/me' : null, fetcher)

    async function logIn(googleData: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (!("googleId" in googleData)) {
            return;
        }

        setCookie('token', googleData.tokenId);

        const res = await fetch("http://localhost:5000/api/auth/", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({token: googleData.tokenId}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            await mutate('http://localhost:5000/api/auth/me', (data: any) => {
                setUser(data)
            })
            history.push('/');
        }
    }

    const logOut = async () => {
        await fetch("http://localhost:5000/api/auth/", {
            method: "DELETE"
        });

        deleteCookie('token');
        await mutate('http://localhost:5000/api/auth/me', (data: any) => {
            setUser({} as User);
        })
    }

    return (
        <AuthContext.Provider value={{isSigned: !!data, error, user: data, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;