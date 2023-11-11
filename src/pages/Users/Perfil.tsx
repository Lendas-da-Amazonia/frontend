import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LibraryBig } from "lucide-react"

import { getInitialsFromName } from "@/lib/getInitialsFromName"
import { ListMyths } from "@/components/ListMyths"
import { useUsers } from "@/app/ContextUsers"
import { Loading } from "@/layouts/Loading"
import { useAuth } from "@/app/ContextAuth"
// import { useUsers } from "@/app/ContextUsers"
const Perfil = () => {
  const navigate = useNavigate()

  const { user } = useAuth()

  const [search, setSeach] = useState("")

  const { id } = useParams()

  const { profiles, getPerfil } = useUsers()

  const perfil = profiles[id || ""]

  useEffect(() => {
    const load = async () => {
      if (id) {
        await getPerfil({ idUser: id })
      }
    }
    if (!perfil) load()
  }, [perfil, id, profiles, getPerfil])

  if (!perfil) return <Loading />

  const myths = Object.values(perfil.myths).filter(
    (myt) =>
      myt.texto.toLowerCase().includes(search.toLowerCase()) ||
      myt.titulo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-full w-full flex justify-center px-5 bg-slate-950 text-white py-10">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-7">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/" />
            <AvatarFallback className="text-black text-4xl font-bold text-center">
              {getInitialsFromName(perfil.user.username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">{perfil.user.username}</p>
            <p className="text-lg">
              <b>{perfil.totalMyths}</b> publicações
            </p>
          </div>
        </div>

        <p className="text-xl font-bold mt-10">Minhas Lendas</p>

        <div className="grid grid-cols-2 md:grid-cols-3 mt-7 mb-5 gap-5">
          <Input
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSeach(e.target.value)}
          />
          <div className="hidden md:flex" />

          {user._id === perfil.user._id && (
            <Button
              className="truncate"
              onClick={() => {
                navigate("/create_legend")
              }}
            >
              Criar nova lenda
            </Button>
          )}
        </div>

        {perfil.totalMyths === 0 && (
          <div className="flex flex-col gap-3 mt-10">
            <LibraryBig className="h-10 w-10 mx-auto" />
            <p className="font-bold text-xl text-center">
              Ainda não há nenhuma publicação
            </p>
          </div>
        )}

        {myths.length === 0 && (
          <div className="flex flex-col gap-3 mt-10">
            <LibraryBig className="h-10 w-10 mx-auto" />
            <p className="font-bold text-xl text-center">
              Nenhuma publicação encontrada
            </p>
          </div>
        )}

        {myths.length > 0 && <ListMyths myths={myths} editAndDelete />}
      </div>
    </div>
  )
}

export default Perfil
