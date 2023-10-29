import { api } from "../api"

const login = async ({ email, senha }: { email: string; senha: string }) => {
  const response = await api().post(`/auth/login`, {
    email: email,
    password: senha,
  })

  return response?.data
}

const signup = async ({
  nome,
  email,
  senha,
}: {
  nome: string
  email: string
  senha: string
}) => {
  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/create`, {
    body: JSON.stringify({ email: email, senha: senha, nome }),
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .catch(() => {})

  return response
}

const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .catch(() => {})

  return response.encontrados
}

export const fnUser = {
  login,
  signup,
  getUsers,
}
