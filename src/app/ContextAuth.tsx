import React, { createContext, useContext, useEffect, useState } from "react";

const _controllerAuth = () => {


  const [status, setStatus] = useState<
    "loading" | "authenticated" | "not_authenticated"
  >("loading");

  useEffect(() => {
    const token = localStorage.getItem("token@lda");
    if(token) setStatus("authenticated")
    else setStatus("not_authenticated")
  }, []);

  const logout = () => {
    localStorage.removeItem("token@lda");
    setStatus("not_authenticated")
  }

  return {
    setStatus,
    status,
    logout
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
