import { Button } from "@/components/Button"
import { Tiptap } from "@/components/Editor"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fnMyth } from "@/services/myth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Create = () => {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  // const [file, setFile] = useState<File | undefined>(undefined)

  const navigate = useNavigate()

  const handlePusblish = async () => {
    if (!title.trim() || !text.trim()) return

    try {
      await fnMyth.create({
        text,
        title,
      })

      toast.success("Lenda publicada com sucesso!")
      navigate("/")
    } catch (e) {
      toast.error("Erro ao criar lenda!")
    }
  }

  return (
    <div className="h-full bg-slate-900 flex justify-center">
      <div className="w-full max-w-3xl py-10 text-white flex flex-col gap-7">
        <div className="col-span-3 h-fit">
          <Label>Título</Label>
          <Input
            placeholder="Digite aqui..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* <div className="col-span-2">
          <Label>Tags</Label>
          <Input placeholder="Digite aqui..." />
        </div> */}

        {/* <div className="col-span-3">
          <InputFile
            label="Capa"
            url=""
            file={file}
            setUrl={() => {}}
            setFile={setFile}
          />
        </div> */}

        <div className="col-span-3 h-fit">
          <Label>História</Label>
          <Tiptap value={text} setValue={(v) => setText(v)} />
        </div>

        <div className="col-span-1 h-fit mt-10">
          <Button onClick={handlePusblish}>Publicar</Button>
        </div>
      </div>
    </div>
  )
}

export default Create
