import { createContext, useState, useContext, useEffect } from "react"
import { TypeMyth } from "@/types/myth.type"
import { useAuth } from "./ContextAuth"
import { api } from "@/services/api"
import { TypeComment } from "@/types/comment.type"

const _mythsController = () => {
  const [general, setGeneral] = useState<TypeMyth[]>([])

  const [loading, setLoading] = useState(true)
  const [readMyths, setReadMyths] = useState<{ [idMyth: string]: TypeMyth }>({})

  const [loadingMyMyths, setLoadingMyMyths] = useState(true)
  const [totalMyMyths, setTotalMyMyths] = useState(0)
  const [myMyths, setMyMyths] = useState<TypeMyth[]>([])

  const [loadingComments, setLoadingComments] = useState(true)
  const [comments, setComments] = useState<{ [idMyth: string]: TypeComment[] }>({})

  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    // logica para trazer os usuarios
    const load = async () => {
      const resp = await api().get(`myth/author/${user._id}`)

      setMyMyths(resp.data?.mitosDoUser)
      setTotalMyMyths(resp.data?.mitosDoUser?.length)
    }

    if (user._id) load()
  }, [user, reload])

  return {
    general,
    setGeneral,
    myMyths,
    setMyMyths,
    loadingMyMyths,
    setLoadingMyMyths,
    totalMyMyths,
    setTotalMyMyths,
    readMyths,
    setReadMyths,
    loading,
    setLoading,
    comments,
    setComments,
    loadingComments,
    setLoadingComments,
    reload,
    setReload

  }
}

const Controller = createContext({} as ReturnType<typeof _mythsController>)

export const useMyth = () => useContext(Controller)

export const MythsProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const controller = _mythsController()
  return (
    <Controller.Provider value={controller}>{children}</Controller.Provider>
  )
}
