import { createContext, useState, useContext, useEffect } from "react";
import { TypeUser } from "../types/user.type";

const _useController = () => {
  
  const [users, setUsers] = useState<TypeUser[]>([]);

  const [authors, setAuthors] = useState<{ [idAuthor: string]: TypeUser }>({});

  useEffect(() => {
    // logica para trazer os usuarios
  }, []);

  return {
    users, setUsers,
    authors,setAuthors
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
