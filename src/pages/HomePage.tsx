import Calendar from '../components/Calendar'
import { motion, useScroll, useSpring } from 'framer-motion'

const HomePage = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="h-screen">
      <div className="fixed left-0 top-0 p-6">
        <h1 className="text-xl">home page</h1>
      </div>
      {Array.from({ length: 12 }, (_, i) => i).map((i) => (
        <div key={i} className="flex justify-center items-center h-full">
          <Calendar month={i} year={2023} />
        </div>
      ))}
      <motion.div
        style={{ scaleX }}
        className="fixed bottom-0 left-0 origin-left h-2 w-full bg-slate-900"
      />
    </div>
  )
}

export default HomePage
