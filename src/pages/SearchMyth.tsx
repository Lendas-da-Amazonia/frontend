import { ListMyths } from "@/components/ListMyths"
import { Input } from "@/components/ui/input"
import { api } from "@/services/api"
import { TypeMyth } from "@/types/myth.type"
import { BookOpenText } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchMyth = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const [loading, setLoading] = useState(false)

  const [myths, setMyths] = useState<TypeMyth[]>([])

  useEffect(() => {
    const loadSearch = async () => {
      setLoading(true)

      const movieSearchAux = await api()
        .get("/myth/search/" + search)
        .then((res) => res.data?.myths)
        .catch(() => [])

      setMyths(movieSearchAux)

      setLoading(false)
    }

    const typingTimeout = setTimeout(() => {
      // A função a ser executada após 1 segundo de inatividade do usuário
      if (search.trim().length > 0) {
        loadSearch()
      }
    }, 1000)

    // Limpar o temporizador se o usuário continuar digitando

    if (search.trim().length > 0) {
      setLoading(true)
    } else setLoading(false)

    navigate(
      search.trim().length > 0 ? `/myth/search?query=${search}` : `/myth/search`
    )

    return () => clearTimeout(typingTimeout)
  }, [search, navigate])

  return (
    <div className="h-full w-full bg-slate-950 text-white">
      <div className="flex flex-col h-full w-full max-w-3xl mx-auto py-5 md:py-10">
        <div className="px-5">
          <h3 className="font-medium text-2xl">Pesquise lendas</h3>

          <Input
            placeholder="Digite aqui..."
            className="mt-5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && (
          <p className="font-bold text-xl text-center animate-bounce mt-10">
            Buscando por "{search}"
          </p>
        )}

        {!loading && myths.length == 0 && search.trim().length == 0 && (
          <div className="flex flex-col gap-3 mt-10">
            <BookOpenText className="h-10 w-10 mx-auto" />
            <p className="font-bold text-xl text-center">
              Pesquise para achar algumas lendas
            </p>
          </div>
        )}

        {myths.length > 0 && !loading && (
          <div className="flex-1 overflow-auto mt-10 px-5">
            <ListMyths myths={myths} />
          </div>
        )}

        {!loading && myths.length == 0 && search.trim().length > 0 && (
          <div className="flex flex-col gap-3 mt-10">
            <BookOpenText className="h-10 w-10 mx-auto" />
            <p className="font-bold text-xl text-center">
              Nenhuma lenda encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchMyth
