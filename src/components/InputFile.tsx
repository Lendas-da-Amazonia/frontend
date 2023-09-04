import { useEffect } from "react";

import { HiTrash } from "react-icons/hi";

export interface InputFileProps extends React.ComponentProps<"input"> {
  label: string;
  file?: File;
  url: string;
  setFile: (file: InputFileProps["file"]) => void;
  setUrl: (url: InputFileProps["url"]) => void;
}

export const InputFile = ({
  file,
  setFile,
  label,
  url,
  setUrl,
  ...props
}: InputFileProps) => {
  const dropAreaId = "drop-area-" + label.toLowerCase();
  const fileInputId = "file-input-" + label.toLowerCase();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileE = event?.target?.files?.[0];
    setFile(fileE);
  };

  useEffect(() => {
    const dropArea = document.getElementById(dropAreaId);
    const fileInput = document.getElementById(fileInputId);

    if (!dropArea || !fileInput) return;

    const dragOverFunc = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.add("border-blue-700");
    };

    const dragLeaveFunc = () => {
      dropArea.classList.remove("border-blue-700");
    };

    const dropFunc = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove("border-blue-700");

      const files = e?.dataTransfer?.files;

      if (files && files.length > 0) {
        setFile(files[0]);
        // Aqui você pode executar ações com o arquivo, como fazer o upload para o Firebase Storage
      }
    };

    dropArea.addEventListener("dragover", dragOverFunc);

    dropArea.addEventListener("dragleave", dragLeaveFunc);

    dropArea.addEventListener("drop", dropFunc);

    dropArea.addEventListener("drop", dropFunc);

    return () => {};
  }, [label]);

  return (
    <div className="w-full h-full flex flex-col">
      {label && <p className="text-slate-200 text-sm mb-1">{label}</p>}

      <label
        id={dropAreaId}
        className="relative flex items-center justify-center w-full h-full p-2 transition bg-slate-800 border-2 border-slate-600 border-dashed rounded appearance-none cursor-pointer hover:border-blue-700 focus:outline-none"
      >
        {file && (
          <>
            <img
              src={URL.createObjectURL(file)}
              loading="lazy"
              className="h-full max-h-[300px] w-full object-contain"
            />
            <div
              className="absolute z-10 top-2 right-2 rounded-full text-slate-300 hover:text-red-500 duration-200"
              onClick={(e) => {
                e.preventDefault();
                setFile(undefined);
              }}
            >
              <HiTrash size={30} />
            </div>
          </>
        )}

        {url && (
          <>
            <img
              src={url}
              loading="lazy"
              className="h-full max-h-[300px] w-full object-contain"
            />
            <div
              className="absolute top-2 right-2 rounded-full text-slate-300 hover:text-red-500 duration-200"
              onClick={(e) => {
                e.preventDefault();
                setUrl("");
              }}
            >
              <HiTrash size={30} />
            </div>
          </>
        )}

        {!url && !file && (
          <div className="text-sm text-slate-400">Escolher um arquivo</div>
        )}

        <input
          {...props}
          type="file"
          className="hidden"
          id={fileInputId}
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
