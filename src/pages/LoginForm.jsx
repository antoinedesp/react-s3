import {useLoginMutation} from "../services/authentication.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../services/user.js";

export default function LoginForm() {
    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatcher = useDispatch();

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

    return (<div className="grid grid-rows-1 gap-8">
        <input placeholder="Email" className="w-48 text-center inline-block rounded-full px-8 py-2 transition border"
               type="text" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Password" className="w-48 text-center inline-block rounded-full px-8 py-2 transition border"
               type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button
            className="w-48 text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
            onClick={loginAttempt}>
            Authentification
        </button>
    </div>);
}