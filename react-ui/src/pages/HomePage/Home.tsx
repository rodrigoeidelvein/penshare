import React, {useContext, useEffect} from "react";
import "./style.css";
import logo from "../../logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";
import AuthContext from "../../contexts/auth";
import {GoogleLogin, GoogleLoginProps, GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {Element, Link} from "react-scroll";
import {faEnvelope, faMobileAlt} from "@fortawesome/free-solid-svg-icons";

function Home() {
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
        console.log(response)
        console.log('fail login')
    };

    return (<div className="scroll-container inicio" id="inicio">
            <div
                className="relative bg-white py-1 top-0 sticky z-50"
                id="mainNav">
                <div className="flex items-center justify-between container mx-auto">
                    <div className="flex items-center justify-between px-4">
                        <span className="fontePanshare">Penshare</span>
                        <img className="inline h-16" src={logo} alt="Logo Penshare"/>
                    </div>
                    <nav className="flex flex-row-reverse pt-3 inline">
                        <ul>
                            <li className="menu-item inline mr-4 p-3 cursor-pointer">
                                <Link activeClass="active" to="inicio" spy={true} smooth={true}
                                      duration={500}>Início</Link>
                            </li>
                            <li className="menu-item inline mr-4 p-3 cursor-pointer">
                                <Link activeClass="active" to="sobre" spy={true} smooth={true}
                                      duration={500}>Sobre</Link>
                            </li>
                            <li className="menu-item inline p-3 cursor-pointer">
                                <Link activeClass="active" to="contato" spy={true} smooth={true}
                                      duration={500}>Contato</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/*    MastHead */}
            <Element name="inicio">
                <header className="masthead" id="inicio">
                    <div className="px-4 flex h-full items-center justify-center">
                        <div className="flex justify-center">
                            <div className="text-center justify-center">
                                <p className="mx-auto my-0 fontePanshareCentroDaTela">Penshare</p>
                                <h2 className="text-white-50 mx-auto mt-2 mb-5">Escrever uma frase bacana pode ser de um
                                    livro, colocar entre aspas"".</h2>
                                {/* Botão e-mail */}
                                <div>
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
                        </div>
                    </div>
                </header>
            </Element>
            {/*    Início sobre */}
            <Element name="sobre">
                <section className="pt-32 inicio-section text-center">
                    <div className="px-4">
                        <div className="flex wrap justify-center">
                            <div className="flex-initial w-2/3">
                                <h2 className="text-xl text-white mb-4">Título da introdução da Penshare</h2>
                                <p className="text-lg mb-20 text-white opacity-50">
                                    Escrever aqui a introdução sobre a plataforma.
                                </p>
                            </div>
                        </div>
                        <img className="max-w-full h-auto" src={`${process.env.PUBLIC_URL}/homepage/images/ipad.png`}
                             alt="..."/>
                    </div>
                </section>
                {/*  2° sessão do Sobre  */}
                <section className="sobre-section bg-blue-50">
                    <div className="w-full mx-auto px-4">
                        {/* Linha sobre apresentada */}
                        <div className="flex flex-wrap m-1 mb-4 items-center justify-center">
                            <div className="w-1/3">
                                <img
                                    className="max-w-full h-auto mb-3"
                                    src={`${process.env.PUBLIC_URL}/homepage/images/bg-masthead.jpg`}
                                    alt="..."/>
                            </div>
                            <div>
                                <div className="text-center text-lg-left">
                                    <h4>Compartilhe documentos</h4>
                                    <p className="text-black-50 mb-0">Colocar aqui uma ligeira descrição sobre
                                        compartilhamento
                                        dos documentos</p>
                                </div>
                            </div>
                        </div>
                        {/* Sobre - Crie documentos... */}
                        <div className="flex flex-wrap m-1 mb-4 items-center justify-center">
                            <div className="w-1/3">
                                <img
                                    className="max-w-full h-auto mb-3"
                                    src={`${process.env.PUBLIC_URL}/homepage/images/demo-image-01.jpg`}
                                    alt="..."
                                />
                            </div>
                            <div>
                                <div className="text-center">
                                    <div className="flex h-full">
                                        <div className="w-full text-center">
                                            <h4>Crie documentos de forma colaborativa</h4>
                                            <p className="mb-0 text-black-50">Colocar aqui uma ligeira descrição sobre
                                                criar
                                                documentos de forma colaborativa.</p>
                                            <hr className="hidden d-lg-block mb-0 ms-0"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sobre - controle de versão */}
                        <div className="flex wrap gx-0 justify-content-center">
                            <div className="col-lg-6">
                                <img
                                    className="max-w-full h-auto"
                                    src={`${process.env.PUBLIC_URL}/homepage/images/demo-image-02.jpg`}
                                    alt="..."/>
                            </div>
                            <div className="flex-initial w-1/2 order-lg-first">
                                <div className="text-center h-full sobre">
                                    <div className="flex h-full">
                                        <div className="sobre-text w-full my-auto text-center text-2xl">
                                            <h4>Controle de versão</h4>
                                            <p className="text-black-50 mb-0 text-xl"> PRECISA ALTERAR A IMAGEM ----
                                                Colocar
                                                aqui
                                                uma
                                                ligeira descrição sobre controle de versão da Penshare.</p>
                                            <hr className="hidden mb-0 me-0"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Element>

            {/* Contato */}
            <Element name="contato" className="contato-section bg-black">
                <div className="px-4">
                    <div className="flex wrap justify-center">
                        <div className="w-1/3 mx-3">
                            <div className="card py-4 h-full">
                                <div className="card-body text-center">
                                    <FontAwesomeIcon className="text-yellow-400" icon={faEnvelope}/>
                                    <h4 className="text-uppercase m-0">Email</h4>
                                    <hr className="my-4 mx-auto"/>
                                    <div className="small text-black-50"><a
                                        href="mailto:contato@penshare.com.br?subject=Contato Penshare"
                                        className="retiraEstiloDeLinks">contato@penshare.com.br</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 mx-3">
                            <div className="card py-4 h-full">
                                <div className="card-body text-center mr-3">
                                    <FontAwesomeIcon className="text-yellow-400" icon={faMobileAlt}/>
                                    <h4 className="text-uppercase m-0">Fone</h4>
                                    <hr className="my-4 mx-auto"/>
                                    <div className="small text-black-50"><a href="tel:+5551999999999"
                                                                            className="retiraEstiloDeLinks">(51) 9
                                        9999-9999</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="social flex justify-center">
                        <a className="mx-2"><FontAwesomeIcon icon={faTwitter}/></a>
                        <a className="mx-2"><FontAwesomeIcon icon={faFacebook}/></a>
                        <a className="mx-2"><FontAwesomeIcon icon={faGithub}/></a>
                    </div>
                </div>
            </Element>
            {/* Footer */}
            <footer className="footer bg-black small text-center text-white-50">
                <div className="items-center px-4 px-lg-5 text-white opacity-50">Desenvolvido pela equipe
                    Penshare &copy; {new Date().getFullYear()}</div>
            </footer>
        </div>
    )
}

export default Home;
