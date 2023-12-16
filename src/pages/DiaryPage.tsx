import '@mdxeditor/editor/style.css'
import { useParams } from 'react-router-dom'
import { MDXEditor } from '@mdxeditor/editor'
import { months } from '../util/time'

type ParamsType = {
  year: string
  month: string
  day: string
}

const DiaryPage = () => {
  const { year, month, day } = useParams<ParamsType>()

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
          markdown=""
          className="pb-8"
          placeholder="write about your day"
        />
      </div>
    </div>
  )
}

export default DiaryPage
