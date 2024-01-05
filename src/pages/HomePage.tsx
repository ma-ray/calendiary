import { useEffect, useRef, useContext, useState } from 'react'
import Calendar from '../components/Calendar'
import { motion, useScroll, useSpring } from 'framer-motion'
import moment from 'moment'
import { SettingsContext } from '../context/SettingsContext'
import { FlatButton } from '../components/FlatButton'

const HomePage = () => {
  const savedYearString = sessionStorage.getItem('currentYear')
  const savedYear =
    savedYearString && !isNaN(Number(savedYearString))
      ? savedYearString
      : moment().year().toString()
  const [year, setYear] = useState(parseInt(savedYear))

  const [availableEntries, setAvailableEntries] = useState<Set<string>>(
    new Set()
  )
  const { loadSettings } = useContext(SettingsContext)
  const calendarListRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: calendarListRef,
  })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const jumpToCurrentMonth = () => {
    const currentMonth = moment().get('month')
    calendarListRef.current?.children[currentMonth].scrollIntoView()
  }

  useEffect(() => {
    const calendarContainer = calendarListRef.current
    if (calendarContainer) {
      const savedScrollPosition = sessionStorage.getItem('calendarPos')
      if (savedScrollPosition) {
        calendarContainer.scrollTop = Number(savedScrollPosition)
      } else {
        jumpToCurrentMonth()
      }
    }
  }, [])

  useEffect(() => {
    window.ipcRenderer.invoke('available-entries', year).then((res) => {
      setAvailableEntries(res)
    })
  }, [year])

  return (
    <div className="h-screen">
      <div className="fixed left-0 top-0 z-10">
        <FlatButton
          label="previous year"
          onClick={(e) => {
            e.preventDefault()
            sessionStorage.setItem('currentYear', (year - 1).toString())
            setYear(year - 1)
          }}
          disabled={year < 1}
        />

        <FlatButton
          label="next year"
          onClick={(e) => {
            e.preventDefault()
            sessionStorage.setItem('currentYear', (year + 1).toString())
            setYear(year + 1)
          }}
        />
      </div>

      <div className="fixed right-4 top-0 z-10">
        <FlatButton
          label="jump to today"
          onClick={(e) => {
            e.preventDefault()
            sessionStorage.setItem('currentYear', moment().year().toString())
            setYear(moment().year())
            jumpToCurrentMonth()
          }}
        />
        <FlatButton
          label="change diary"
          onClick={(e) => {
            e.preventDefault()
            window.ipcRenderer.invoke('open-directory').then((res) => {
              if (res) {
                loadSettings()
              }
            })
          }}
        />
      </div>
      <div
        ref={calendarListRef}
        className=" h-screen snap-mandatory snap-y overflow-y-scroll"
        onScroll={(e) =>
          sessionStorage.setItem(
            'calendarPos',
            e.currentTarget.scrollTop.toString()
          )
        }
      >
        {Array.from({ length: 12 }, (_, i) => i).map((i) => (
          <div
            key={i}
            className="snap-center relative flex justify-center items-center h-full"
          >
            <Calendar
              month={i}
              year={year}
              availableEntries={availableEntries}
            />
          </div>
        ))}
      </div>
      <motion.div
        style={{ scaleX }}
        className="fixed bottom-0 left-0 origin-left h-2 w-full bg-slate-900"
      />
    </div>
  )
}

export default HomePage
