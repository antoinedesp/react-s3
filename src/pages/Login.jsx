import {useEffect, useState} from "react";
import {useIsAuthenticatedMutation, useLoginMutation} from "../services/authentication.js";
import {AuthenticatedCrud} from "./AuthenticatedCrud.jsx";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../services/user.js";

export default function Login() {


    const [isAuthenticatedMutation, { isLoading: isAuthenticationLoading }] = useIsAuthenticatedMutation();

    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatcher = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // Method to check if user is authenticated on load
    // Method to try to login
    const loginAttempt = () => {
        // Call API
        loginMutation({
            email: email,
            password: password,
        }).then((response) => {
            try {
                if(response.error && response.error.status === 400) {
                    alert('Identifiants incorrects.');
                    return;
                }
            } catch(e) {
                console.log(e);
            }

            if(response.data.id !== null) {
                alert('Succès.');
                dispatcher(login())
                return;
            }
        });

    }

    const fetchAuthenticationStatus = () => {
        try {
            isAuthenticatedMutation().then((response) => {
                if(response.error && response.error.status === 401) {
                    dispatcher(logout());
                }
                else {
                    dispatcher(login());
                }
            });
        } catch(e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchAuthenticationStatus();
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center">


            <p className="text-2xl font-bold pt-4 italic">{isUserAuthenticated ? <>Backoffice</> : <>Authentification</>}</p>

            <div>
                {
                    isUserAuthenticated
                        ? <AuthenticatedCrud/>
                        : (
                            <div className="grid grid-rows-1 gap-8">
                                <input placeholder="Email" className="w-48 text-center inline-block rounded-full px-8 py-2 transition border"
                                       type="text" onChange={(e) => setEmail(e.target.value)}/>
                                <input placeholder="Password" className="w-48 text-center inline-block rounded-full px-8 py-2 transition border"
                                       type="password" onChange={(e) => setPassword(e.target.value)}/>
                                <button
                                    className="w-48 text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
                                    onClick={loginAttempt}>
                                    Authentification
                                </button>
                            </div>
                        )
                }
            </div>


        </div>);
}

