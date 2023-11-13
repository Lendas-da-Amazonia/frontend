import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"

import { LibraryBig, Settings } from "lucide-react"

import { ListMyths } from "@/components/ListMyths"

import { useAuth } from "@/app/ContextAuth"

import { useController } from "./controller"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// import { useUsers } from "@/app/ContextUsers"
export const MyPostsTabs = () => {
  const { search, setSeach, perfil } = useController()

  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const myths = Object.values(perfil.myths).filter(
    (myt) =>
      myt.texto.toLowerCase().includes(search.toLowerCase()) ||
      myt.titulo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-7 mb-5 gap-5">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSeach(e.target.value)}
        />
        <div className="hidden md:flex" />

        {user._id === perfil.user._id && (
          <Button
            className="truncate hidden lg:flex"
            onClick={() => {
              navigate("/create_legend")
            }}
          >
            Criar nova lenda
          </Button>
        )}

        {user._id === perfil.user._id && (
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden ml-auto">
              <Settings className="h-7 w-7" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

      {myths.length === 0 && perfil.totalMyths > 0 && (
        <div className="flex flex-col gap-3 mt-10">
          <LibraryBig className="h-10 w-10 mx-auto" />
          <p className="font-bold text-xl text-center">
            Nenhuma publicação encontrada
          </p>
        </div>
      )}

      {myths.length > 0 && <ListMyths myths={myths} editAndDelete />}
    </>
  )
}
