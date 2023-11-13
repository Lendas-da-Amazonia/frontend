import { createContext, useState, useContext, useEffect } from "react"
import { TypeMyth, TypeMyths } from "@/types/myth.type"
import { useAuth } from "./ContextAuth"
import { api } from "@/services/api"
import { TypeComment } from "@/types/comment.type"
import { MythModel } from "@/model/Myth.model"

const _mythsController = () => {
  const [general, setGeneral] = useState<TypeMyth[]>([])

  const [loading, setLoading] = useState(true)
  const [readMyths, setReadMyths] = useState<{ [idMyth: string]: TypeMyth }>({})

  const [loadingMyMyths, setLoadingMyMyths] = useState(true)
  const [totalMyMyths, setTotalMyMyths] = useState(0)
  const [myMyths, setMyMyths] = useState<TypeMyth[]>([])
  const [myMythsDict, setMyMythsDict] = useState<{
    [idMyth: string]: TypeMyth
  }>({})

  const [mythsFavorites, setMythsFavorites] = useState<TypeMyths>({})

  // const [mythsByAuthorId, setMyByAuthor] = useState<{
  //   [idAuthor: string]: { [idMyth: string]: TypeMyth }
  // }>({})

  const [loadingComments, setLoadingComments] = useState(true)
  const [comments, setComments] = useState<{ [idMyth: string]: TypeComment[] }>(
    {}
  )

  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  const getFavorites = async () => {

    let mythsFavoritesAux = { ...mythsFavorites }
  
    const resp = await api().get(`/favorite/my-favorites`).then((res) => res.data as any[]).catch(() => [])

    resp.forEach((mythFavorite) => {

      const myth = MythModel(mythFavorite)

      mythsFavoritesAux = {
        ...mythsFavoritesAux,
        [myth._id]: myth
      }

    })

    setMythsFavorites(mythsFavoritesAux)

  }

  useEffect(() => {

    const myMythsAux = [...myMyths]

    getFavorites()

    myMythsAux.forEach((myth) => {
      setMyMythsDict((prev) => ({
        ...prev,
        [myth._id]: myth 
      }))
      setReadMyths((prev) => ({
        ...prev,
        [myth._id]: myth 
      }))
    })

  }, [myMyths])

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
    getFavorites,
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
    setReload,
    myMythsDict,
    setMyMythsDict
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
