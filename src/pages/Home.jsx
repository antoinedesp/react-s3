import { Link } from 'react-router-dom'
import { useGetAllPastriesQuery } from "../services/pastries.js";

export default function Home() {

    const { data: pastriesData, error: pastriesError, isLoading: pastriesAreLoading } = useGetAllPastriesQuery();

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

          <p className="text-xl font-bold pt-4 uppercase">Patisserie 3WA</p>

          {pastriesError && <p>Error fetching pastries: {pastriesError}</p>}

          <div className="grid grid-cols-3 gap-12">
              {pastriesAreLoading ? (
                  <p>Loading pastries...</p>
              ) : (
                  pastriesData && pastriesData.map((pastrie) => {
                      return (
                          <div className="relative border" key={pastrie.id * Date.now()}>
                              <div className="w-full">
                                  <img src="https://picsum.photos/200/300" className="object-cover" alt={`Image of ${pastrie.name}`}/>
                              </div>
                              <div className="p-5 ">
                                  <h1 className="text-md font-semibold text-blue-700">{pastrie.name}</h1>
                              <div className="italic text-sm font-bold text-gray-400  bottom-5">Encore {pastrie.quantity} à gagner!</div>
                              </div>
                          </div>
                      );

                  })
              )}
          </div>

      </div>
  )
}
