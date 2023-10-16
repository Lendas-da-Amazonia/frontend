import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useState } from "react";
const Cops = () => {
  const navigate = useNavigate();

  const [search, setSeach] = useState("");

  return (
    <div className="h-full w-full flex justify-center px-5">
      <div className="w-full max-w-4xl">
        <p className="text-3xl font-bold">Minhas Lendas</p>

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
              navigate("/create_legend");
            }}
          >
            Criar nova lenda
          </Button>
        </div>

        <div className="flex flex-col gap-3 mt-20">
            <p className="font-bold text-xl text-center">Nenhuma lenda criada! :(</p>
        </div>
      </div>
    </div>
  );
};

export default Cops;
