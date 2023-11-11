import { Link, useNavigate } from "react-router-dom"

import { useLocation } from "react-router-dom"

import { Button } from "../components/Button"
import { MENU } from "../constants/MENU"
import { useAuth } from "@/app/ContextAuth"

export const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] h-screen hidden lg:flex text-white fixed top-0 left-0 px-3 py-5 flex-col bg-slate-900 z-50">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Link to={"/"}>
            <p className="text-center text-lg font-bold">Lendas da Amazônia</p>
          </Link>
          <nav className="mt-5 flex-1 px-2 space-y-1" aria-label="Sidebar">
            {MENU().map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.pathname)}
                className={`
                ${
                  location.pathname === item.pathname
                    ? "bg-slate-700 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }
                group cursor-pointer flex gap-3 items-center px-3 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    location.pathname.includes(item.pathname)
                      ? "text-gray-300"
                      : "text-gray-400 group-hover:text-gray-300"
                  }
                `}
                  size={25}
                />
                <span className="flex-1">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-slate-400 text-base flex items-center flex-col gap-1">
            <a
              className="hover:text-white duration-200 w-fit"
              target="_blank"
              href="https://github.com/LuacsM"
            >
              Developed by @Maia
            </a>
            <p>v1.0.0</p>
          </div>
          <Button variant="white" onClick={logout}>
            Sair
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-[calc(100%-300px)] ml-auto h-screen">
        <div className="h-[calc(100%-3.5rem)] lg:h-full overflow-auto w-full">
          {children}
        </div>
        <div className="relative z-50 flex justify-evenly lg:hidden h-14 w-full bg-slate-900">
          {MENU().map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.pathname)}
              className={`group cursor-pointer flex gap-3 items-center px-2 text-sm font-medium rounded-md`}
            >
              <item.icon
                className={`${
                  location.pathname === item.pathname
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-300"
                }
                `}
                size={25}
              />
        
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
