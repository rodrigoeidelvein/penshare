import HomeContainer from "../components/HomeContainer";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginProps,
    GoogleLoginResponseOffline,
} from "react-google-login";
import {useContext} from "react";
import AuthContext from "../contexts/auth";

const LoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;

    const {logIn} = useContext(AuthContext);

    const successGoogleLoginResponse = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        try {
            await logIn(response);
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao fazer login");
        }

    };

    const failureGoogleLoginResponse = (response: GoogleLoginProps) => {
        console.log('fail login')
    };

    return (
        <HomeContainer>
            <div className="text-4xl">
                <span className="login-title">Faça login no <span className="app-name">Penshare</span></span>
                <div className="mt-3 text-center">
                     <GoogleLogin
                            clientId={clientId}
                            buttonText="Faça login com Google"
                            onSuccess={successGoogleLoginResponse}
                            onFailure={failureGoogleLoginResponse}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                        />
                </div>
            </div>
        </HomeContainer>
    );
};

export default LoginPage;
