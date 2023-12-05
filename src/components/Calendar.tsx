import { Calendar as CalendarBase } from 'calendar-base'

type DayProps = {
  dayNumber: number
}

const Day: React.FC<DayProps> = ({ dayNumber }) => {
  return (
    <div className="flex items-center justify-center border border-black h-24 w-24">
      <h4 className="scroll-m-20 text-2xl font-medium tracking-tight">
        {dayNumber}
      </h4>
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

  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  const days = calendar.getCalendar(year, month)

  return (
    <div className="inline-block">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        {`${months[month]} ${year}`}
      </h1>
      <div className="grid grid-cols-7 text-center">
        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((wd) => (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {wd}
          </h4>
        ))}
      </div>
      <div className={`border border-black grid grid-cols-7`}>
        {days.map(
          (num) =>
            num && <Day key={`${num.day}-${num.month}`} dayNumber={num.day} />
        )}
      </div>
    </div>
  )
}

export default Calendar
