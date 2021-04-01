import {createContext, useState} from "react";
import { setCookie, deleteCookie } from "../utils";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import { useHistory } from 'react-router-dom';

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
    logIn(googleData: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void>;
    logOut(): void;
}

const AuthContext = createContext<AuthContextData>(({} as AuthContextData));

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState({} as User);
    const [isSigned, setIsSigned] = useState(false);
    let history = useHistory();

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

        const userInstance = await res.json() as User;

        setUser(userInstance);
        setIsSigned(true);
        history.push('/');
    }

    const logOut = async () => {
        await fetch("http://localhost:5000/api/auth/", {
            method: "DELETE"
        });
        setUser({} as User);
        deleteCookie('token');
        setIsSigned(false);
    }


    return (
        <AuthContext.Provider value={{isSigned, user, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;