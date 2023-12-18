import { Calendar as CalendarBase, CalendarDate } from 'calendar-base'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { months } from '../util/time'

type DayProps = {
  date: CalendarDate
}

const Day: React.FC<DayProps> = ({ date }) => {
  const dayPassed = moment([date.year, date.month, date.day]).isBefore(
    moment().startOf('day')
  )

  const isToday = moment([date.year, date.month, date.day]).isSame(
    moment().startOf('day')
  )

  const bg =
    date.siblingMonth && dayPassed
      ? 'bg-daypassed'
      : dayPassed
      ? 'bg-daypassed'
      : isToday
      ? 'bg-today'
      : ''

  return (
    <div
      className={`flex items-center justify-center border border-black h-24 w-24 col ${bg}`}
    >
      <Link to={`/diary/${date.year}/${date.month}/${date.day}`}>
        <h4 className="scroll-m-20 text-2xl font-bold tracking-tight">
          {date.day}
        </h4>
      </Link>
    </div>
  )
}

type CalendarProps = {
  month: number
  year: number
}

const Calendar: React.FC<CalendarProps> = ({ month, year }) => {
  const calendar = new CalendarBase({
    siblingMonths: true,
  })

  const days = calendar.getCalendar(year, month)

  return (
    <div className="flex flex-col gap-3">
      <h1 className="scroll-m-20 text-4xl font-black tracking-tight">
        {`${months[month]} ${year}`}
      </h1>
      <div className="grid grid-cols-7 text-center">
        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((wd) => (
          <h4
            key={wd}
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            {wd}
          </h4>
        ))}
      </div>
      <div className={`border border-black grid grid-cols-7`}>
        {days.map(
          (date) =>
            date && <Day key={`${date.day}-${date.month}`} date={date} />
        )}
      </div>
    </div>
  )
}

export default Calendar
