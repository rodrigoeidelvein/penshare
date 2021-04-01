import {
    GoogleLogout,
} from "react-google-login";
import {useContext} from "react";
import AuthContext from "./contexts/auth";

const LoggedHomePage: React.FC = () => {
    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;

    const {user, logOut} = useContext(AuthContext);

    const successGoogleLogoutResponse = () => {
        logOut();
    };

    return (
        <div>
            <div>Olá, {user.firstName}</div>
            <GoogleLogout clientId={clientId} buttonText="Logout"
                          onLogoutSuccess={successGoogleLogoutResponse}/>
        </div>
    )
}

export default LoggedHomePage;