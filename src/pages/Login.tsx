import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { fnUser } from "../services/user";
import { useAuth } from "../app/ContextAuth";
import { UserModel } from "../model/User.model";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth()

  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    const res = await fnUser.login({ email: info.email, senha: info.password })
    if(res?.message === "Logado com sucesso") {
      setUser(UserModel(res.user))
      navigate("/users");
    }
    setLoading(false);
  };

  return (
    <main className="h-screen w-full flex flex-col md:flex-row text-white">
      <div className="relative w-full h-full bg-black bg-cover bg-no-repeat flex items-center justify-center">
        <div
          className="absolute top-0 left-0 h-screen w-full opacity-25"
          style={{ backgroundImage: 'url("/bg_login.jpg")' }}
        />
        <div className="relative font-extrabold text-4xl lg:text-6xl z-20 flex flex-col justify-center items-center gap-10">
          <img src={"/logo.png"} className="h-fit w-fit"/>
          <h1 className="drop-shadow-lg">Lendas da Amazônia</h1>
        </div>
      </div>
      <div
        className={`w-full md:w-[600px] h-full px-10 md:px-16 col-span-1 bg-slate-900 flex flex-col items-center justify-center gap-5`}
      >
        <p className="font-bold text-lg">Faça login</p>

        <Input
          label="Email"
          placeholder="Ex: example@gmail.com"
          value={info.email}
          onChange={(e) => setInfo((prev) => ({ ...prev, email: e.target.value }))}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={info.password}
          onChange={(e) =>
            setInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <Button loading={loading} onClick={async () => await handleLogin()}>
          Entrar
        </Button>

        <Link to={"/signup"} className="text-sm underline text-blue-500">Não possui uma conta? Criar uma</Link>

      </div>
    </main>
  );
};

export default Login;
