import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <>

      <h1>Patisserie 3WA</h1>

      <div className="card">
        <Link to="/play">
          <button>
            Jouer
          </button>
        </Link>
      </div>

    </>
  )
}
