export default function Contact() {

    return (
        <div className="flex flex-col gap-4 items-center">
            <p className="text-2xl font-bold pt-4 italic">Nous contacter</p>
            <div className="grid grid-rows-1 gap-8">
                <input placeholder="Votre nom" className="w-full text-center inline-block rounded-full px-8 py-2 transition border"
                       type="text" />
                <textarea placeholder="Votre message" className="w-full text-center inline-block rounded-full px-8 py-2 transition border">
                    </textarea>
                <button
                    className="w-full text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
                    onClick={() => alert('Désolé, cette fonction n\'est pas encore implémentée :(')}>
                    Envoyer
                </button>
            </div>
        </div>);

}