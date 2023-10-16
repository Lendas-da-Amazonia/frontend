import { BookOpen } from "lucide-react";
import { HiUsers } from "react-icons/hi";

export const MENU = [
  {
    name: "Usuários",
    pathname: "/users",
    icon: HiUsers,
  },
  {
    name: "Minhas Lendas",
    pathname: "/my_legends",
    icon: BookOpen,
  }
];
