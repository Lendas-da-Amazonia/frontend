import { TypeUser } from "../types/user.type";

export const UserModel = (obj: Partial<TypeUser> = {}): TypeUser => ({
  _id: obj?._id || "",
  nome: obj?.nome || "",
  email: obj?.email || "",
});
