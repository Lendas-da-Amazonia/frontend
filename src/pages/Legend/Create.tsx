import { Tiptap } from "@/components/Editor";
import { useState } from "react";
import parse from "html-react-parser";


const Create = () => {
  const [content, setValue] = useState("");

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center">
      <div className="w-full max-w-2xl text-white">
        <Tiptap value={content} setValue={(v) => setValue(v)}/>
        <div>
            {parse(content)}
        </div>
      </div>
    </div>
  );
};

export default Create;
