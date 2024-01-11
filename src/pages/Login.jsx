import {useEffect, useState} from "react";
import {useIsAuthenticatedMutation, useLoginMutation} from "../services/authentication.js";
import {AuthenticatedCrud} from "./AuthenticatedCrud.jsx";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../services/user.js";
import LoginForm from "../components/LoginForm.jsx";

export default function Login() {


    const [isAuthenticatedMutation, { isLoading: isAuthenticationLoading }] = useIsAuthenticatedMutation();

    const dispatcher = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.user.isAuthenticated);


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
                            <LoginForm/>
                        )
                }
            </div>


        </div>);
}

