import { Home, Search, UserCircle2 } from "lucide-react";
import { HiUsers } from "react-icons/hi";

export const MENU = [
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
    name: "Pesquisar",
    pathname: "/search",
    icon: Search,
  },
  {
    name: "Perfil",
    pathname: "/perfil",
    icon: UserCircle2,
  }
];
