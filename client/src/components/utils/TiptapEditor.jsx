import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import Heading from "@tiptap/extension-heading"

const TiptapEditor = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[200px] border",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className='flex flex-col justify-stretch min-h-[200px]'>
      <Toolbar editor = {editor}/>
      <EditorContent editor={editor}/>
    </div>
  )
}

export default TiptapEditor