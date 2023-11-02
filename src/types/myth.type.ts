
export type TypeMyth = {
  /** Identificador único de documentos do mongoDB*/
  _id: string;
  id_autor: string;
  titulo: string;
  texto: string;
  imagem: string,
  created_at?: Date;
}