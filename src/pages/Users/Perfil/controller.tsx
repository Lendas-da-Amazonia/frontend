import { createContext, useState, useContext, useEffect } from "react"

import { useParams } from "react-router-dom"

import { useUsers } from "@/app/ContextUsers"
import { useMyth } from "@/app/ContextMyths"

const _controller = () => {

  const [search, setSeach] = useState("")

  const { id } = useParams()

  const { profiles, getPerfil } = useUsers()

  const { setReload } = useMyth()

  const perfil = profiles[id || ""]

  useEffect(() => {
    const load = async () => {
      if (id) {
        await getPerfil({ idUser: id })
        setReload((prev) => !prev)
      }
    }
    if (!perfil) load()
  }, [perfil, id, profiles, getPerfil, setReload])

  return {
    perfil,
    search,
    setSeach
  }
}

const Controller = createContext({} as ReturnType<typeof _controller>)

export const useController = () => useContext(Controller)

export const PerfilPageProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const controller = _controller()
  return (
    <Controller.Provider value={controller}>{children}</Controller.Provider>
  )
}
