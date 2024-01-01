import { useEffect, useRef } from 'react'
import Calendar from '../components/Calendar'
import { motion, useScroll, useSpring } from 'framer-motion'
import moment from 'moment'
import { Settings } from 'lucide-react'

const HomePage = () => {
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

  return (
    <div className="h-screen">
      <div className="fixed right-5 top-0 z-10 flex items-center">
        <button className="hover:bg-slate-100 p-3" onClick={jumpToCurrentMonth}>
          <p className="font-bold">jump to today</p>
        </button>
        <button className="hover:bg-slate-100 p-3">
          <Settings className="" size={'1.5em'} />
        </button>
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
            <Calendar month={i} year={moment().year()} />
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
