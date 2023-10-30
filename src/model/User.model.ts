import { TypeUser } from "../types/user.type";

export const UserModel = (obj: Partial<TypeUser> = {}): TypeUser => ({
  _id: obj?._id || "",
  nome: obj?.nome || (obj as any)?.nome || "",
  username: obj?.username || (obj as any)?.nome || "",
  email: obj?.email || "",
});
