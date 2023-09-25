import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useUsers } from "../../app/ContextUsers";
import { useEffect, useState } from "react";
import { fnUser } from "../../services/user";
import { UserModel } from "../../model/User.model";

const Cops = () => {
  const navigate = useNavigate();

  const { users, setUsers } = useUsers();

  const [search, setSeach] = useState("");

  useEffect(() => {
    const get = async () => {
      let lixAux = await fnUser.getUsers()
      lixAux = lixAux.map((u: any) => UserModel(u))
      setUsers(lixAux)
    }

    get()
  }, [])

  let list = users.sort((obj1, obj2) =>
    obj1.nome.normalize("NFD").toLowerCase() <
    obj2.nome.normalize("NFD").toLowerCase()
      ? -1
      : 1
  );

  list = list.filter(
    (obj) =>
      obj.nome
        .normalize("NFD")
        .toLowerCase()
        .includes(search.normalize("NFD").toLowerCase()) ||
      obj.email
        .normalize("NFD")
        .toLowerCase()
        .includes(search.normalize("NFD").toLowerCase())
  );

  return (
    <div className="w-full flex justify-center px-5">
      <div className="w-full max-w-4xl">
        <p className="text-3xl font-bold">Usuários</p>

        <div className="grid grid-cols-3 mt-5">
          <Input
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSeach(e.target.value)}
          />
          <div />

          <Button
            className="truncate"
            onClick={() => {
              navigate("/polices/add");
            }}
          >
            Criar novo usuário
          </Button>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <div className="grid grid-cols-2 gap-3 py-1 px-5 font-medium">
            <div className="col-span-1 flex items-center gap-3">
              <p>Nome</p>
              <div className="w-20 " />
            </div>
            <div className="col-span-1 hidden lg:flex">
              <p>Email</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {list.map((user) => {
              return (
                <div
                  key={user._id}
                  className={`grid group grid-cols-2 gap-3 h-14 py-1 rounded px-5 bg-slate-200 group duration-200 border border-slate-300 hover:border-slate-700 cursor-pointer`}
                >
                  <div className="col-span-1 items-center hidden lg:flex">
                    <p>{user.nome}</p>
                  </div>
                  <div className="col-span-1 items-center hidden lg:flex">
                    <p>{user.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cops;
