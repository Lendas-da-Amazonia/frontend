import { useAuth } from "@/app/ContextAuth"
import { Home, Search, UserCircle2 } from "lucide-react"

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
      name: "Meu Perfil",
      pathname: "/perfil/" + user._id,
      icon: UserCircle2,
    },
  ]
}
