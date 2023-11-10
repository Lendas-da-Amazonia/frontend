import { useMyth } from "@/app/ContextMyths";
import { Button } from "@/components/Button";
import { Tiptap } from "@/components/Editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fnMyth } from "@/services/myth";
import { TypeMyth } from "@/types/myth.type";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/app/ContextAuth";

const Create = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { myMythsDict, setReload } = useMyth();

  const mythEdit = id ? myMythsDict[id] : {} as TypeMyth;

  const [title, setTitle] = useState(mythEdit?.titulo || "");
  const [text, setText] = useState(mythEdit?.texto || "");
  const [image, setImage] = useState(mythEdit?.imagem || "");

  function convertToBase64() {
    const fileInput = document.getElementById("image") as HTMLInputElement | null;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const result = reader.result as string;
          console.log(result);
          setImage(result);
        }
      };
      reader.onerror = (error) => {
        console.log("Error", error);
      };
    }
  }

  const navigate = useNavigate();

  const handlePusblish = async () => {
    if (!title.trim() || !text.trim()) return;

    if (id) {
      try {
        await fnMyth.edit({
          id,
          data: {
            texto: text,
            titulo: title,
            imagem: image
          }
        });

        toast.success("Lenda editada!");
        setReload(prev => !prev);
        navigate("/legends/" + id);

      } catch (e) {
        console.error(e);
        toast.error("Erro ao editar!");
      }

      return;
    }

    try {
      await fnMyth.create({
        text,
        title,
        image
      });

      setReload(prev => !prev);
      toast.success("Lenda publicada!");
      navigate("/perfil/" + user._id);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao criar lenda!");
    }
  }

  return (
    <div className="h-full bg-slate-950 flex justify-center">
      <div className="w-full max-w-3xl py-10 text-white flex flex-col gap-7">
        <div className="col-span-3 h-fit">
          <Label>Título</Label>
          <Input
            placeholder="Digite aqui..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-span-3 h-fit">
          <Label>História</Label>
          <Tiptap value={text} setValue={(v) => setText(v)} />
        </div>

        <div className="col-span-3 h-fit">
  <Label>Capa da lenda</Label>
  <div className="mt-1 p-2 border border-white rounded-md flex flex-col items-center justify-center">
    {image && (
      <img src={image} alt="Imagem selecionada" className="w-[200px] h-[150px]" />
    )}
    <div className="flex text-sm text-gray-600">
      <label
        htmlFor="image"
        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <span>Selecione uma imagem</span>
        <input
          id="image"
          accept="image/*"
          type="file"
          className="sr-only"
          onChange={convertToBase64}
        />
      </label>
    </div>
    
  </div>
</div>



        <div className="col-span-1 h-fit mt-10">
          <Button onClick={handlePusblish}>Publicar</Button>
        </div>
      </div>
    </div>
  );
}

export default Create;
