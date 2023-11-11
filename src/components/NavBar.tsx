import { useAuth } from "@/app/ContextAuth"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "./Button"
import { Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export const NavBar = () => {
  const { status, logout } = useAuth()

  const navigate = useNavigate()

  const options = [
    {
      label: "Início",
      to: "/",
    },
    {
      label: "Sobre nós",
      to: "/about_us",
    },
    {
      label: "Pesquisar Lendas",
      to: "/myth/search",
    }
  ]

  return (
    <div className="fixed h-16 z-50 bg-slate-900 w-full text-white flex items-center justify-center">
      <header className="flex w-full max-w-6xl items-center justify-between px-5">
        <div className="gap-5 items-center hidden md:flex">
          {options.map((op) => (
            <Link to={op.to}>{op.label}</Link>
          ))}

          {/* <a href="#">Ajuda</a> */}
          {status === "authenticated" && (
            <p onClick={logout} className="cursor-pointer">
              Sair
            </p>
          )}
        </div>

        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="h-8 w-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
              {options.map((op) => (
                <DropdownMenuItem onClick={() => navigate(op.to)}>
                  {op.label}
                </DropdownMenuItem>
              ))}
              {status === "authenticated" && (
                <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {status === "not_authenticated" && (
          <Link to={"/login"}>
            <Button>Fazer Login</Button>
          </Link>
        )}
      </header>
    </div>
  )
}
