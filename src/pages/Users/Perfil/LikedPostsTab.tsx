import { LibraryBig } from "lucide-react"

import { ListMyths } from "@/components/ListMyths"

import { useController } from "./controller"

// import { useUsers } from "@/app/ContextUsers"
export const LikedPostsTab = () => {
  const { perfil } = useController()
  
  const favorites = Object.values(perfil.favorites)

  return (
    <>
      {perfil.totalMyths === 0 && (
        <div className="flex flex-col gap-3 mt-10">
          <LibraryBig className="h-10 w-10 mx-auto" />
          <p className="font-bold text-xl text-center">
            Ainda não há nenhuma publicação
          </p>
        </div>
      )}

      {favorites.length === 0 && perfil.totalMyths > 0 && (
        <div className="flex flex-col gap-3 mt-10">
          <LibraryBig className="h-10 w-10 mx-auto" />
          <p className="font-bold text-xl text-center">
            Nenhuma publicação encontrada
          </p>
        </div>
      )}

      {favorites.length > 0 && <ListMyths myths={favorites} editAndDelete />}
    </>
  )
}
