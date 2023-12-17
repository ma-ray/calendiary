import '@mdxeditor/editor/style.css'
import { useParams } from 'react-router-dom'
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
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
    <div className="h-full">
      <div className="flex flex-col gap-3 mx-auto w-1/2 pt-24">
        <div className="flex gap-6">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight">
            {`${months[parseInt(month ?? '0')]} ${day}, ${year}`}
          </h1>
          <h1 className="scroll-m-20 text-4xl font-normal tracking-tight text-gray-500">
            today
          </h1>
        </div>
        <MDXEditor
          markdown={markdown}
          className="pb-8"
          placeholder="write about your day"
          plugins={[
            headingsPlugin(),
            quotePlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin({}),
            markdownShortcutPlugin(),
          ]}
          contentEditableClassName="prose mdx-markdown"
        />
      </div>
    </div>
  )
}

export default DiaryPage
