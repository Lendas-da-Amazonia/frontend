import axios from "axios"

export const api = () => {
  const token = localStorage.getItem("token@lda")

  return axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
