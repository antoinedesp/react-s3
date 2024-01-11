import {useGetAllPastriesQuery} from "../services/pastries.js";
import {
    useLogoutMutation,
    useDeletePastryMutation,
    useAddPastryMutation,
    useEditPastryMutation
} from "../services/authentication.js";
import {useState} from "react";
import {logout} from "../services/user.js";
import {useDispatch} from "react-redux";
export function AuthenticatedCrud() {

    const { refetch: refetchAllPastriesQuery, data: pastriesData, error: pastriesError, isLoading: pastriesAreLoading } = useGetAllPastriesQuery();

    const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
    const [addPastryMutation, { isLoading: isPastryAdditionLoading }] = useAddPastryMutation();
    const [deletePastryMutation, { isLoading: isPastryDeletionLoading }] = useDeletePastryMutation();
    const [editPastryMutation, { isLoading: isPastryEditionLoading }] = useEditPastryMutation();

    const [isPastryAddFormShown, setIsPastryAddFormShown] = useState(false);
    const [isEditingPastry, setIsEditingPastry] = useState(0);


    const [newPastryImage, setNewPastryImage] = useState("");
    const [newPastryName, setNewPastryName] = useState("");
    const [newPastryQuantity, setNewPastryQuantity] = useState(0);

    const [editingPastryImage, setEditingPastryImage] = useState("");
    const [editingPastryName, setEditingPastryName] = useState("");
    const [editingPastryQuantity, setEditingPastryQuantity] = useState(0);

    const dispatcher = useDispatch();

    const addPastrieAttempt = () => {
        addPastryMutation({
            image: newPastryImage,
            name: newPastryName,
            quantity: newPastryQuantity,
            choice: '',
        }).then((response) => {
            if(response.error) {
                alert('Erreur')
            }
            else if(response.data) {
                alert('Succès');
                refetchAllPastriesQuery();
            }
        })
    }

    const editPastryAttempt = (pastrieId) => {
        editPastryMutation({
            id: pastrieId,
            image: editingPastryImage,
            name: editingPastryName,
            quantity: editingPastryQuantity,
            choice: '',
        }).then((response) => {
            if(response.error) {
                alert('Erreur')
                setIsEditingPastry(0);
            }
            else if(response.data) {
                alert('Succès');
                setIsEditingPastry(0);
                refetchAllPastriesQuery();
            }
        })
    }

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

            deletePastryMutation(pastrieId).then((response) => {

               if(response.error) {

                   alert('Erreur');

               }
               else {

                   if(response.data && response.data.status === 200) {

                       alert('Supprimé avec succès');
                       refetchAllPastriesQuery();

                   }
               }

            });
        }
    }

    const showEditionForm = (pastrie) => {
        setEditingPastryImage(pastrie.image);
        setEditingPastryName(pastrie.name);
        setEditingPastryQuantity(pastrie.quantity);
        setIsEditingPastry(pastrie.id);
    }

    return (<div className="grid grid-rows-1 gap-8">
        <button
            className="w-full text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
            onClick={() => setIsPastryAddFormShown(!isPastryAddFormShown)}>
            {!isPastryAddFormShown ? 'Ajouter une patisserie' : 'Cacher le formulaire'}
        </button>
        {
            isPastryAddFormShown ? (
                <div className="w-full grid grid-rows-1 gap-2">
                    <input placeholder="URL Image" className="w-full text-center inline-block rounded-full px-8 py-2 transition border" onChange={(e) => setNewPastryImage(e.target.value)} type="text"/>
                    <input placeholder="Titre" className="w-full text-center inline-block rounded-full px-8 py-2 transition border" onChange={(e) => setNewPastryName(e.target.value)} type="text"/>
                    <input placeholder="Quantité" className="w-full text-center inline-block rounded-full px-8 py-2 transition border" onChange={(e) => setNewPastryQuantity(e.target.value)} type="number"/>
                    <button
                        className="w-full text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
                        onClick={addPastrieAttempt}
                        >
                        Ajouter
                    </button>
                </div>) : <></>
        }

        {pastriesData && pastriesData.map((pastrie) => {
            return isEditingPastry !== 0 && isEditingPastry === pastrie.id ? (
                    <div key={pastrie.id} className="border-2 max-h-56 h-56 grid grid-cols-12">
                        <div className="col-span-4 overflow-hidden">
                            <img src="https://picsum.photos/200/300" className="object-cover w-full"
                                 alt={`Image of ${pastrie.name}`}/>
                        </div>
                        <div className="col-span-8 p-4">
                            <div
                                className="flex flex-col gap-2 place-items-center align-middle justify-items-center">
                                <input key="image" defaultValue={pastrie.image} onChange={event => setEditingPastryImage(event.target.value)} className="w-full text-center inline-block rounded-full px-8 py-2 transition border" type="text"/>
                                <input key="name" defaultValue={pastrie.name} onChange={event => setEditingPastryName(event.target.value)} className="w-full text-center inline-block rounded-full px-8 py-2 transition border" type="text"/>
                                <input key="quantity" defaultValue={pastrie.quantity} onChange={event => setEditingPastryQuantity(event.target.value)} className="w-full text-center inline-block rounded-full px-8 py-2 transition border" type="number"/>
                                <div
                                    className="flex flex-row space-x-4">
                                    <div
                                        onClick={() => editPastryAttempt(pastrie.id)}
                                        className="w-32 text-center inline-block rounded-full bg-slate-400 color-white px-8 py-2 text-white hover:bg-slate-600 transition">
                                        Sauvegarder
                                    </div>
                                    <div
                                        className="w-32 text-center inline-block rounded-full bg-red-400 color-white px-8 py-2 text-white hover:bg-red-600 transition"
                                        onClick={() => deletePastrieAttempt(pastrie.id)}>
                                        Supprimer
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                <div key={pastrie.id} className="border-2 max-h-36 h-36 grid grid-cols-12">
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
                                onClick={() => showEditionForm(pastrie)}
                                className="flex flex-row space-x-4">
                                <div
                                    className="w-32 text-center inline-block rounded-full bg-slate-400 color-white px-8 py-2 text-white hover:bg-slate-600 transition">
                                    Modifier
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        })}
        <button
            className="w-full text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
            onClick={logoutAttempt}>
            Déconnexion
        </button>
    </div>);
}
