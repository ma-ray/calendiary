import { useEffect, useRef } from 'react'
import Calendar from '../components/Calendar'
import { motion, useScroll, useSpring } from 'framer-motion'
import moment from 'moment'

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

  useEffect(() => {
    const calendarContainer = calendarListRef.current
    if (calendarContainer) {
      const savedScrollPosition = sessionStorage.getItem('calendarPos')
      if (savedScrollPosition) {
        calendarContainer.scrollTop = Number(savedScrollPosition)
      } else {
        const currentMonth = moment().get('month')
        calendarContainer.children[currentMonth].scrollIntoView()
      }
    }
  }, [])

  return (
    <div className="h-screen">
      <div className="fixed left-0 top-0 p-6">
        <h1 className="text-xl">home page</h1>
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
            <Calendar month={i} year={2023} />
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
