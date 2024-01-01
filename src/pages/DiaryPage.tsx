import '@mdxeditor/editor/style.css'
import { Link, useParams } from 'react-router-dom'
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  CodeToggle,
  MDXEditorMethods,
} from '@mdxeditor/editor'
import { months } from '../util/time'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

type ParamsType = {
  year: string
  month: string
  day: string
}

const DiaryPage = () => {
  const { year, month, day } = useParams<ParamsType>()
  const [loading, setLoading] = useState(true)
  const [fileContent, setFileContent] = useState('')
  const editorRef = useRef<MDXEditorMethods>(null)

  const debouncedWriteToFile = debounce((content) => {
    window.ipcRenderer.send('write-diary', content)
  }, 500)

  useEffect(() => {
    window.ipcRenderer
      .invoke('read-diary')
      .then((value: string) => setFileContent(value))
      .catch((error) => {
        console.error('Error reading diary:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    editorRef.current?.setMarkdown(fileContent)
  }, [fileContent])

  if (loading) return <div>loading...</div>

  return (
    <div className="h-screen">
      <Link to="/">
        <button className="hover:bg-slate-100 p-3 fixed left-0 top-0">
          <p className="font-bold">home</p>
        </button>
      </Link>
      <div className="flex flex-col gap-3 mx-auto w-1/2 pt-24">
        <div className="flex gap-6 px-3">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight">
            {`${months[parseInt(month ?? '0')]} ${day}, ${year}`}
          </h1>
          <h1 className="scroll-m-20 text-4xl font-normal tracking-tight text-gray-500">
            today
          </h1>
        </div>
        <div className="pb-8">
          <MDXEditor
            markdown=""
            placeholder="write about your day"
            plugins={[
              headingsPlugin(),
              quotePlugin(),
              listsPlugin(),
              linkPlugin(),
              linkDialogPlugin({}),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <BlockTypeSelect />
                    <CreateLink />
                    <CodeToggle />
                  </>
                ),
              }),
            ]}
            ref={editorRef}
            onChange={(e) => debouncedWriteToFile(e)}
            contentEditableClassName="prose max-w-none mdx-markdown pl-0"
          />
        </div>
      </div>
    </div>
  )
}

export default DiaryPage
