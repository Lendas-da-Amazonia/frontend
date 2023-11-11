// import { convertStringToHTML } from "@/lib/convertStringToHtml"
import { TypeMyth } from "@/types/myth.type"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { fnMyth } from "@/services/myth"
import { useMyth } from "@/app/ContextMyths"

export const ListMyths = ({
  myths,
  editAndDelete,
}: {
  myths: TypeMyth[]
  editAndDelete?: boolean
}) => {
  const { setReload, reload } = useMyth()

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {myths.map((myth) => (
        <Link to={"/legends/" + myth?._id} className="bg-slate-800 rounded-md border-2 border-slate-700 hover:border-slate-500 duration-200">
          <div style={{ backgroundImage: myth?.imagem ? `url(${myth?.imagem})` : "url(/logo.png)" }} className={`bg-center bg-cover bg-no-repeat aspect-video bg-slate-800 rounded flex items-start justify-end p-2`}>
            {editAndDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/edit_legend/${myth._id}`)
                    }}
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async (e) => {
                      e.stopPropagation()
                      await fnMyth.remove({ id: myth._id })
                      setReload(!reload)
                    }}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="mt-2 font-bold p-2 pb-0">{myth?.titulo}</p>
          <p className="text-slate-400 p-2 pt-0">de {myth?.nome_autor}</p>
          {/* <div className="text-sm">
            {convertStringToHTML(
              myth?.texto?.substring(0, 50) +
                (myth?.texto?.length > 50 ? "..." : "")
            )}
          </div> */}
        </Link>
      ))}
    </div>
  )
}
