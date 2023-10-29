import { convertStringToHTML } from "@/lib/convertStringToHtml"
import { TypeMyth } from "@/types/myth.type"
import { Link } from "react-router-dom"
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
import { toast } from "react-toastify"

export const ListMyths = ({
  myths,
  editAndDelete,
}: {
  myths: TypeMyth[]
  editAndDelete?: boolean
}) => {
  const { setReload, reload } = useMyth()

  return (
    <div className="grid grid-cols-3 gap-5 w-full mt-10">
      {myths.map((myth) => (
        <Link to={"/legends/" + myth?._id}>
          <div className="aspect-video col-span-1 bg-slate-700 rounded flex items-start justify-end p-2">
            {editAndDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      toast.info("Em breve esta ação estará disponível!", { toastId: "soon" })
                    }
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
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
          <p className="mt-2 font-bold">{myth?.titulo}</p>
          <div className="text-sm">
            {convertStringToHTML(
              myth?.texto?.substring(0, 100) +
                (myth?.texto?.length > 100 ? "..." : "")
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
