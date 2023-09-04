import React, { createContext, useContext, useEffect, useState } from "react";
import { TypeUser } from "../types/user.type";

const _controllerAuth = () => {
  const [user, setUser] = useState<TypeUser>({} as TypeUser);

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "not_authenticated"
  >("loading");

  useEffect(() => {
    if(user._id) setStatus("authenticated")
    else setStatus("not_authenticated")
  }, [user]);

  return {
    user,
    setUser,
    status
  };
};

export const AuthContext = createContext(
  {} as ReturnType<typeof _controllerAuth>
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const controller = _controllerAuth();
  return (
    <AuthContext.Provider value={controller}>
      {props.children}
    </AuthContext.Provider>
  );
};
