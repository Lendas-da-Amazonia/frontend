import { createContext, useState, useContext, useEffect } from "react";
import { TypeUser } from "../types/user.type";

const _useController = () => {
  
  const [users, setUsers] = useState<TypeUser[]>([]);

  useEffect(() => {
    // logica para trazer os usuarios
  }, []);

  return {
    users, setUsers
  };
};

const Controller = createContext({} as ReturnType<typeof _useController>);

export const useUsers = () => useContext(Controller);

export const UsersProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const controller = _useController();
  return (
    <Controller.Provider value={controller}>{children}</Controller.Provider>
  );
};
