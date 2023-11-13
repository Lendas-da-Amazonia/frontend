import { createContext, useState, useContext, useEffect } from "react"
import { TypeUser } from "../types/user.type"
import { TypeMyths } from "@/types/myth.type"

import { api } from "@/services/api"
import { UserModel } from "@/model/User.model"
import { MythModel } from "@/model/Myth.model"
import { useAuth } from "./ContextAuth"

type TypeUserMyth = {
  [idAuthor: string]: {
    user: TypeUser
    myths: TypeMyths
    favorites: TypeMyths
    totalMyths: number
  }
}

const _useController = () => {
  const [users, setUsers] = useState<TypeUser[]>([])

  const { user } = useAuth()

  const [authors, setAuthors] = useState<{ [idAuthor: string]: TypeUser }>({})

  const [profiles, setProfiles] = useState<TypeUserMyth>({})

  const getPerfil = async ({ idUser }: { idUser: string }) => {
    let profilesAux: TypeUserMyth = { ...profiles }

    try {
      const author = await api().get(`/user/${idUser}`)

      if (author?.data?.buscado)
        profilesAux = {
          ...profilesAux,
          [idUser]: {
            ...profilesAux[idUser],
            user: UserModel(author?.data?.buscado),
            myths: {},
            favorites: {},
          },
        }

      const mythsAux = await api().get(`/myth/author/${idUser}`)

      if (user._id === idUser) {
        const respFav = await api().get(`/favorite/my-favorites`)

        const favorites = respFav.data

        for (const favorite of favorites) {
          if (favorite.myth) {
            const myth = MythModel(favorite.myth)

            profilesAux = {
              ...profilesAux,
              [idUser]: {
                ...profilesAux[idUser],
                favorites: {
                  ...profilesAux[idUser].favorites,
                  [myth._id]: myth,
                },
              },
            }
          }
        }
      }

      mythsAux?.data?.mitosDoUser?.forEach((mythObj: any) => {
        const myth = MythModel(mythObj)

        profilesAux = {
          ...profilesAux,
          [idUser]: {
            ...profilesAux[idUser],
            myths: {
              ...profilesAux[idUser].myths,
              [myth._id]: myth,
            },
          },
        }
      })

      profilesAux = {
        ...profilesAux,
        [idUser]: {
          ...profilesAux[idUser],
          totalMyths: mythsAux?.data?.mitosDoUser?.length,
        },
      }
    } catch (e) {
      console.error(e)
    }

    setProfiles(profilesAux)
  }

  useEffect(() => {
    // logica para trazer os usuarios
  }, [])

  return {
    getPerfil,
    users,
    setUsers,
    authors,
    setAuthors,
    profiles,
    setProfiles,
  }
}

const Controller = createContext({} as ReturnType<typeof _useController>)

export const useUsers = () => useContext(Controller)

export const UsersProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const controller = _useController()
  return (
    <Controller.Provider value={controller}>{children}</Controller.Provider>
  )
}
