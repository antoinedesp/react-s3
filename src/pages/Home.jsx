import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div className="flex flex-col gap-4 items-center">
        <p className="text-2xl font-bold pt-4 italic">Patisserie 3WA</p>
        <p>
            Tentez de remporter une ou plusieurs patisseries avec notre jeu de yam's...
        </p>
        <Link to="/play"
              className="w-48 text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition">
            Jouer
        </Link>
    </div>
  )
}
