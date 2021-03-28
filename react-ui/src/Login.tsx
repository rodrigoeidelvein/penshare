import HomeContainer from "./HomeContainer";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginProps,
    GoogleLoginResponseOffline,
    GoogleLogout,
} from "react-google-login";
import {useState} from "react";

const LoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID as string;
    const secretKey = process.env._REACT_APP_GOOGLE_CLIENT_SECRET as string;

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [fullName, setFullname] = useState("");
    const [id, setId] = useState("");

    const successGoogleLoginResponse = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        if ("googleId" in response) {
            const profile = response.getBasicProfile();

            setEmail(profile.getEmail());
            setFirstName(profile.getGivenName());
            setFullname(profile.getName());
            setId(profile.getId());
            console.log()
            const res = await fetch("http://localhost:5000/api/v1/auth/google", {
                method: "POST",
                body: JSON.stringify({token: response.tokenId}),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            console.log(data);
        }
    };

    const failureGoogleLoginResponse = (response: GoogleLoginProps) => {
        console.log(response);
    };

    const successGoogleLogoutResponse = () => {
        console.log("logout feito");
    };

    return (
        <HomeContainer>
            <div className="text-4xl">
                Faça login no <span className="app-name">Penshare</span>
                <div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={successGoogleLoginResponse}
                        onFailure={failureGoogleLoginResponse}
                        cookiePolicy={"single_host_origin"}
                    />

                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={successGoogleLogoutResponse}
                    />
                </div>
            </div>
        </HomeContainer>
    );
};

export default LoginPage;
