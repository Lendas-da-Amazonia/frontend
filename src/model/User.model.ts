import { TypeUser } from "../types/user.type";

export const UserModel = (obj: Partial<TypeUser> = {}): TypeUser => ({
  _id: obj?._id || "",
  username: obj?.username || (obj as any)?.nome || "",
  email: obj?.email || "",
});
