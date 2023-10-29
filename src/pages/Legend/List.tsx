import { useAuth } from "@/app/ContextAuth"
import { Button } from "@/components/Button"
import { Input } from "@/components/ui/input"
import { fnMyth } from "@/services/myth"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const List = () => {
  const [list, setList] = useState<any[]>([])

  const { status, logout } = useAuth()

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
      <div className="fixed z-50 bg-slate-900 w-full p-5 text-white flex justify-center">
        <header className="flex w-full max-w-6xl justify-between">
          <div className="flex gap-5 items-center">
            <a href="#">Início</a>
            <Link to={status === "authenticated" ? "/create_legend" : "/login"}>
              Criar uma história
            </Link>
            <a href="#">Coleção</a>
            {/* <a href="#">Ajuda</a> */}
            {status === "authenticated" && (
              <p onClick={logout} className="cursor-pointer">
                Sair
              </p>
            )}
          </div>
          <Input
            placeholder="Procurar uma lenda"
            className="w-fit min-w-[300px]"
          />
          {status === "not_authenticated" && (
            <Link to={"/login"}>
              <Button>Fazer Login</Button>
            </Link>
          )}
        </header>
      </div>

      <main className="relative mt-20 h-full w-full p-10 flex flex-col gap-10 justify-center items-center">
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
        <div className="relative bg-slate-900 w-full h-full px-5 py-10 text-white flex flex-col gap-7 items-center justify-center">
          <section className="w-full max-w-3xl">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Últimas publicações</h1>
              <a href="#" className="text-blue-400">
                Ver mais
              </a>
            </div>

            <div className="grid grid-cols-3 gap-5 w-full mt-5">
              {list
                // .filter((_: any, index) => index < 3)
                .map((myth: any) => (
                  <Link to={"/legends/" + myth?._id}>
                    <div className="aspect-video col-span-1 bg-slate-700 rounded"></div>
                    <p className="mt-2 font-bold">{myth?.titulo}</p>
                    <div className="text-sm">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            myth?.texto?.substring(0, 100) +
                            (myth?.texto?.length > 100 ? "..." : ""),
                        }}
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default List
