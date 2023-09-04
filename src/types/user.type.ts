
export type TypeUser = {
  /** Identificador único de documentos do mongoDB*/
  _id: string;
  /** Identificador único do usuários. Também será o RG/PASSAPORTE dele*/
  nome: string;
  email: string;
}