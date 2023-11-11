import { useMyth } from "@/app/ContextMyths"
import { ListMyths } from "@/components/ListMyths"
import { MythModel } from "@/model/Myth.model"
import { fnMyth } from "@/services/myth"
import { useEffect } from "react"

const List = () => {

  const { readMyths, setReadMyths } = useMyth()


  useEffect(() => {

    const load = async () => {
      const lixAux = await fnMyth.getAll()

      lixAux.forEach((myth) => {
 
        setReadMyths((prev) => ({
          ...prev,
          [myth._id]: MythModel(myth)
        }))
      })
  
    }
    load()
   
  }, [setReadMyths])

  return (
    <div className="h-full min-h-screen bg-slate-900 relative text-white flex flex-col justify-between">
      <div
        className="fixed top-0 left-0 h-screen w-full opacity-25"
        style={{ backgroundImage: 'url("/bg_login.jpg")' }}
      />

      <main className="relative w-full p-10 flex flex-col gap-10 justify-center items-center">
        <img src={"/logo.png"} className="h-fit w-fit" />

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Bem vindo ao Lendas da Amazônia!
          </h1>
          <h2 className="text-xl font-semibold mt-1">
            Conheça e compartilhe suas lendas!
          </h2>
        </div>
      </main>

      {Object.values(readMyths).length > 0 && (
        <div className="relative bg-slate-950 w-full p-5 text-white flex flex-col items-center justify-center">
          <section className="w-full max-w-3xl">
            <div className="flex justify-between mb-5">
              <h1 className="text-lg font-bold">Últimas publicações</h1>
              <a href="#" className="text-blue-400">
                Ver mais
              </a>
            </div>

            <ListMyths myths={Object.values(readMyths)} />
          </section>
        </div>
      )}
    </div>
  )
}

export default List
