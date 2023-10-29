import { TypeMyth } from "@/types/myth.type";

export const MythModel = (obj: Partial<TypeMyth> = {}): TypeMyth => ({
  _id: obj?._id || "",
  titulo: obj?.titulo || "",
  id_autor: obj?.id_autor || "",
  created_at: obj?.created_at || new Date(),
  texto: obj?.texto || "",
});
