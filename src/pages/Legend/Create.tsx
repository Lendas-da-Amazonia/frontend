import { Tiptap } from "@/components/Editor"
import { InputFile } from "@/components/InputFile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const Create = () => {
  const [content, setValue] = useState("")
  const [file, setFile] = useState<File | undefined>(undefined)

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center">
      <div className="h-full w-full max-w-3xl py-10 text-white grid grid-cols-3 gap-7">
        <div className="col-span-1">
          <Label>Título</Label>
          <Input placeholder="Digite aqui..." />
        </div>

        <div className="col-span-2">
          <Label>Tags</Label>
          <Input placeholder="Digite aqui..." />
        </div>

        <div className="col-span-3">
          <InputFile
            label="Capa"
            url=""
            file={file}
            setUrl={() => {}}
            setFile={setFile}
          />
        </div>

        <div className="col-span-3">
          <Label>História</Label>
          <Tiptap value={content} setValue={(v) => setValue(v)} />
        </div>
      </div>
    </div>
  )
}

export default Create
