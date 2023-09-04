import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { MENU } from "../constants/MENU";
import { Button } from "../components/Button";

export const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] h-screen text-white fixed top-0 left-0 px-3 py-5 flex flex-col bg-slate-900">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <p className="text-center text-lg font-bold">Lendas da Amazônia</p>
          <nav className="mt-5 flex-1 px-2 space-y-1" aria-label="Sidebar">
            {MENU.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.pathname)}
                className={`
                ${
                  location.pathname.includes(item.pathname)
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
          <Button variant="white" onClick={handleLogout}>Sair</Button>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] ml-auto py-14 bg-slate-100 relative">
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10 bg-center bg-cover bg-no-repeat" />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
};
