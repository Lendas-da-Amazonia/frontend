import { toast } from "react-toastify"
import { api } from "../api"
import { TypeMyth } from "@/types/myth.type"

const create = async ({
  title,
  text,
}: {
  title: string
  text: string
}) => {
  const response = await api().post("myth/create", {
    titulo: title,
    texto: text,
  }, { 
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token@lda")}`
    }
  })
  return response
}

const getAll = async () => {
    try {

        const response = await api().get("myth", { 
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token@lda")}`
            }
        })
        return response.data?.myths as Array<any>
    }
    catch {
        return []
    }
  }

const getByTitle = async (
 { title }: { title: string }
) => {
    try {

        const response = await api().get("myth/"+title, { 
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token@lda")}`
            }
        })
        return response.data as any
    }
    catch {
        return {}
    }
  }

const remove = async ({ id }: { id: string}) => {

  try {
    await api().delete(`/myth/delete/${id}`)
    toast.success("Excluído!")
  }
  catch {
    toast.error("Error ao excluir!")
  }

}

const edit = async ({ id, data }: { id: string, data: Partial<TypeMyth> }) => {
    await api().patch(`/myth/${id}/edit`, { ...data })
}

export const fnMyth = {
    create,
    edit,
    getAll,
    getByTitle,
    remove
}
