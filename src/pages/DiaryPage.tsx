import '@mdxeditor/editor/style.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
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
} from '@mdxeditor/editor'
import { months } from '../util/time'

type ParamsType = {
  year: string
  month: string
  day: string
}

const DiaryPage = () => {
  const { year, month, day } = useParams<ParamsType>()

  const markdown = `
  Hello
`

  return (
    <div className="h-screen">
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
            markdown={markdown}
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
            contentEditableClassName="prose max-w-none mdx-markdown pl-0"
          />
        </div>
      </div>
    </div>
  )
}

export default DiaryPage
