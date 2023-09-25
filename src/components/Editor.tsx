import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";

import { Pilcrow, Heading as HeadIcon } from "lucide-react";

import ListItem from "@tiptap/extension-list-item";

const Button = (props: React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={`h-6 w-6 rounded-md flex justify-center items-center hover:bg-white/20 ${props.className}`}
    />
  );
};

const CLASSNAME_ACTIVE = "text-black bg-white";

const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center justify-between bg-slate-700 text-white p-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? CLASSNAME_ACTIVE : ""}
        >
          <FaBold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? CLASSNAME_ACTIVE : ""}
        >
          <FaItalic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? CLASSNAME_ACTIVE : ""}
        >
          <FaUnderline />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? CLASSNAME_ACTIVE : ""}
        >
          <FaStrikethrough />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? CLASSNAME_ACTIVE : ""
          }
        >
          <HeadIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? CLASSNAME_ACTIVE : ""}
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? CLASSNAME_ACTIVE : ""}
        >
          <FaListUl />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? CLASSNAME_ACTIVE : ""}
        >
          <FaQuoteLeft />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </Button>
      </div>
    </div>
  );
};

export const Tiptap = ({
  value,
  setValue,
}: {
  value: string;
  setValue?: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        HTMLAttributes: {
          class: "text-3xl",
        },
        levels: [3],
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "text-base",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-disc ml-10",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue && setValue(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto p-3 bg-transparent focus:outline-none max-h-[600px] overflow-auto",
      },
    },
  });

  if (!editor) return <></>;

  return (
    <div className="bg-white text-black rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor}/>
    </div>
  );
};
