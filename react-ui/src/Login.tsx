import HomeContainer from "./HomeContainer";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginProps,
    GoogleLoginResponseOffline,
    GoogleLogout,
} from "react-google-login";
import {useContext} from "react";
import AuthContext from "./contexts/auth";

const LoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;

    const {isSigned, user, logIn} = useContext(AuthContext);

    const successGoogleLoginResponse = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        try {
            await logIn(response);
        } catch (error) {
            throw new Error("Erro ao fazer login");
        }

    };

    const failureGoogleLoginResponse = (response: GoogleLoginProps) => {
        console.log('fail login')
    };



    const handleClick = async (e: any) => {
        e.preventDefault();
        const data = await fetch('http://localhost:5000/api/auth/me', {
            method: "GET",
            credentials: "include"
        });

        console.log(data)
    }

    return (
        <HomeContainer>
            <div className="text-4xl">
                Faça login no <span className="app-name">Penshare</span>
                <div className="mt-3">
                     <GoogleLogin
                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={successGoogleLoginResponse}
                            onFailure={failureGoogleLoginResponse}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                        />
                    <button onClick={handleClick}>Botao Teste</button>
                </div>
            </div>
        </HomeContainer>
    );
};

export default LoginPage;
