const login = async ({ email, senha }: { email: string; senha: string }) => {
  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/login`, {
    body: JSON.stringify({ email: email, senha: senha }),
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .catch(() => {});

  return response;
};

const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .catch(() => {});

  return response.encontrados;
};

export const fnUser = {
  login,
  getUsers,
};
