import { ListMyths } from "@/components/ListMyths"
import { fnMyth } from "@/services/myth"
import { useEffect, useState } from "react"

const List = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    const load = async () => {
      const lixAux = await fnMyth.getAll()
      setList(lixAux)
    }
    load()
  }, [])

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

      {list.length > 0 && (
        <div className="relative bg-slate-900 w-full p-5 text-white flex flex-col items-center justify-center">
          <section className="w-full max-w-3xl">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Últimas publicações</h1>
              <a href="#" className="text-blue-400">
                Ver mais
              </a>
            </div>

            <ListMyths myths={list} />
          </section>
        </div>
      )}
    </div>
  )
}

export default List
