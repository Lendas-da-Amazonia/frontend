import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMyth } from "@/app/ContextMyths"

import { LibraryBig } from "lucide-react"
import { useAuth } from "@/app/ContextAuth"
import { getInitialsFromName } from "@/lib/getInitialsFromName"
import { ListMyths } from "@/components/ListMyths"
const Cops = () => {
  const navigate = useNavigate()

  const [search, setSeach] = useState("")

  const { user } = useAuth()
  const { myMyths, totalMyMyths } = useMyth()

  return (
    <div className="h-full w-full flex justify-center px-5 bg-slate-800 text-white py-10">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-7">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/" />
            <AvatarFallback className="text-black text-4xl font-bold text-center">
              {getInitialsFromName(user.username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">{user.username}</p>
            <p className="text-lg">
              <b>{totalMyMyths}</b> publicações
            </p>
          </div>
        </div>

        <p className="text-xl font-bold mt-10">Minhas Lendas</p>

        <div className="grid grid-cols-3 mt-7">
          <Input
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSeach(e.target.value)}
          />
          <div />

          <Button
            className="truncate"
            onClick={() => {
              navigate("/create_legend")
            }}
          >
            Criar nova lenda
          </Button>
        </div>

        {!totalMyMyths && (
          <div className="flex flex-col gap-3 mt-20">
            <LibraryBig className="h-10 w-10 mx-auto" />
            <p className="font-bold text-xl text-center">
              Ainda não há nenhuma publicação
            </p>
          </div>
        )}

        {totalMyMyths && <ListMyths myths={myMyths} editAndDelete/>}
      </div>
    </div>
  )
}

export default Cops
