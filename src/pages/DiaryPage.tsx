import '@mdxeditor/editor/style.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import {
  dateStatus,
  getNextDayLink,
  getPreviousDayLink,
  isDateValid,
  months,
} from '../util/date'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { FlatButton } from '../components/FlatButton'

type ParamsType = {
  year: string
  month: string
  day: string
}

const DiaryPage = () => {
  const { year, month, day } = useParams<ParamsType>()
  const navigate = useNavigate()
  const [canEdit, setCanEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fileContent, setFileContent] = useState('')
  const editorRef = useRef<MDXEditorMethods>(null)

  const debouncedWriteToFile = debounce((content) => {
    window.ipcRenderer.send('write-diary', year, month, day, content)
  }, 500)

  const dayIsFuture = moment().isBefore(
    moment([
      parseInt(year ?? '2024'),
      parseInt(month ?? '0'),
      parseInt(day ?? '1'),
    ])
  )

  useEffect(() => {
    if (!isDateValid(day, month, year)) {
      navigate('/')
    }
  }, [day, month, year, navigate])

  useEffect(() => {
    if (year && month && day) {
      const isToday = moment([year, month, day]).isSame(moment().startOf('day'))

      window.ipcRenderer
        .invoke('does-diary-exist', year, month, day)
        .then((diaryExists) => {
          if (isToday || (diaryExists && !dayIsFuture)) {
            window.ipcRenderer
              .invoke('read-diary', year, month, day)
              .then((value: string) => setFileContent(value))
              .then(() => setCanEdit(true))
              .catch((error) => {
                console.error('Error reading diary:', error)
              })
          } else {
            setCanEdit(false)
          }
          setLoading(false)
        })
    }
  }, [year, month, day, dayIsFuture])

  useEffect(() => {
    editorRef.current?.setMarkdown(fileContent)
  }, [fileContent])

  if (loading) return <div>loading...</div>

  return (
    <div className="h-screen">
      <Link to="/">
        <FlatButton className="fixed left-0 top-0" label="home" />
      </Link>
      <div className="fixed top-0 right-0">
        {canEdit && (
          <FlatButton
            label="open file location"
            onClick={(e) => {
              e.preventDefault()
              window.ipcRenderer.send(
                'show-diary-page-in-explorer',
                year,
                month,
                day
              )
            }}
          />
        )}
        <Link to={getPreviousDayLink(day ?? '1', month ?? '0', year ?? '2024')}>
          <FlatButton label="previous day" />
        </Link>
        <Link to={getNextDayLink(day ?? '1', month ?? '0', year ?? '2024')}>
          <FlatButton label="next day" />
        </Link>
      </div>
      <div className="flex flex-col gap-3 mx-auto w-1/2 pt-24">
        <div className="flex gap-6 px-3">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight">
            {`${months[parseInt(month ?? '0')]} ${day}, ${year}`}
          </h1>
          <h1 className="scroll-m-20 text-4xl font-normal tracking-tight text-gray-500">
            {day && month && year ? dateStatus(day, month, year) : 'unknown'}
          </h1>
        </div>
        {!canEdit ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            {dayIsFuture ? (
              <>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  the day has not come yet.
                </h3>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  come back later and write about your day!
                </h3>
              </>
            ) : (
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                nothing was recorded on this day
              </h3>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default DiaryPage
