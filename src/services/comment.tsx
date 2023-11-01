import { toast } from "react-toastify"
import { api } from "./api"

const remove = async ({ id }: { id: string }) => {
  try {
    await api().delete(`/comment/${id}/delete`)
    toast.success("Excluído!")
  } catch {
    toast.error("Error ao excluir!")
  }
}

export const fnComment = {
  remove,
}
