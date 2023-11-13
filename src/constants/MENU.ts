import { useAuth } from "@/app/ContextAuth"
import { Home, PlusSquare, Search, UserCircle2 } from "lucide-react"

export const MENU = () => {
  const { user } = useAuth()

  return [
    {
      name: "Página Inicial",
      pathname: "/",
      icon: Home,
    },
    // {
    //   name: "Usuários",
    //   pathname: "/users",
    //   icon: HiUsers,
    // },
    {
      name: "Pesquisar Lenda",
      pathname: "/myth/search",
      icon: Search,
    },
    {
      name: "Criar Lenda",
      pathname: "/create_legend",
      icon: PlusSquare,
    },
    {
      name: "Meu Perfil",
      pathname: "/perfil/" + user._id,
      icon: UserCircle2,
    },
  ]
}
