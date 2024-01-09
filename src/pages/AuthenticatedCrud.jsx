import {useGetAllPastriesQuery} from "../services/pastries.js";
import {useLogoutMutation} from "../services/authentication.js";
import {useState} from "react";
import {logout} from "../services/user.js";
import {useDispatch} from "react-redux";
export function AuthenticatedCrud() {

    const { data: pastriesData, error: pastriesError, isLoading: pastriesAreLoading } = useGetAllPastriesQuery();
    const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const dispatcher = useDispatch();
    const logoutAttempt = () => {
        logoutMutation().then((response) => {
            if (response.data && response.data.loggedIn === false) {
                dispatcher(logout())
            }
            else {
                alert('Erreur');
            }
        });
    }

    const deletePastrieAttempt = (pastrieId) => {
        if(confirm('Êtes vous sur de vouloir supprimer cet élément ?')) {
            // TODO
        }
    }

    return (<div className="grid grid-rows-1 gap-8">
        {pastriesData && pastriesData.map((pastrie) => {
            return (
                <div key={pastrie.id * Date.now()} className="border-2 max-h-36 h-36 grid grid-cols-12">
                    <div className="col-span-4 overflow-hidden">
                        <img src="https://picsum.photos/200/300" className="object-cover w-full"
                             alt={`Image of ${pastrie.name}`}/>
                    </div>
                    <div className="col-span-8 p-4">
                        <div
                            className="flex flex-col gap-2 place-items-center align-middle justify-items-center">
                            <div
                                className="text-md font-semibold text-slate-600">{pastrie.name}</div>
                            <div
                                className="text-sm text-slate-400">Quantité: {pastrie.quantity}</div>
                            <div
                                className="flex flex-row space-x-4">
                                <div
                                    className="w-32 text-center inline-block rounded-full bg-slate-400 color-white px-8 py-2 text-white hover:bg-slate-600 transition">
                                    Modifier
                                </div>
                                <div
                                    className="w-32 text-center inline-block rounded-full bg-red-400 color-white px-8 py-2 text-white hover:bg-red-600 transition"
                                    onClick={() => deletePastrieAttempt(pastrie.quantity)}>
                                    Supprimer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        <button
            className="w-48 text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
            onClick={logoutAttempt}>
            Déconnexion
        </button>

    </div>);
}