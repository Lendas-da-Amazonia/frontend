import { fnMyth } from "@/services/myth";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

const convertStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Certifique-se de adicionar uma chave única aqui se renderizar vários elementos.
  return (
    <div
      key="content"
      className="text-justify"
      dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
    />
  );
};

const Post = () => {

  const { title } = useParams()

  const [myth, setMyth] = useState<any>({})

  useEffect(() => { 
    if(title) {
      const load = async () => {
        const auxMyth = await fnMyth.getByTitle({ title })
        setMyth(auxMyth)
      }
      load()
    }
  }, [title])

  console.log("myth ", myth)

  return (
    <div className="relative min-h-screen bg-black flex justify-center">
      <div className="fixed w-full h-screen bg-[url('/bg_login.jpg')] opacity-20" />
      <div className="relative z-10 w-full max-w-2xl bg-slate-950/70 text-neutral-300 px-5 pt-10 pb-20">
        <Link to={"/"}>
          {/* <ArrowLeft className="h-4 w-4" /> */}
          Voltar
        </Link>

        <div className="flex items-center gap-5 mt-10">
          <div className="h-24 w-24 rounded-full bg-white" />
          <div>
            <h1 className="text-lg font-bold">{myth?.id_autor}</h1>
            <p className="text-neutral-400">ID do usuário</p>
            <p className="text-neutral-400">{myth?.created_at && format(new Date(myth?.created_at), "dd 'de' MMMM 'de' yyyy")}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold overflow-auto mt-5">
          {myth?.titulo}
        </h1>

        <div className="mt-7">{convertStringToHTML(myth?.texto)}</div>
      </div>
    </div>
  );
};

export default Post;
