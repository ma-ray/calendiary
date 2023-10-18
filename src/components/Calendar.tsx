type DayProps = {
  dayNumber: number
}

const Day: React.FC<DayProps> = ({ dayNumber }) => {
  return (
    <div className="flex items-center justify-center border border-black">
      <span>{dayNumber}</span>
    </div>
  )
}

const Calendar = () => {
  const dayNumbers = Array.from({ length: 35 }, (_, index) => index + 1)

  return (
    <div className="border border-black">
      {/* <div className="grid grid-cols-[repeat(7,6rem)] grid-rows-[repeat(5,6rem)] border-black"> */}
      <div className="grid md:grid-cols-[repeat(7,5rem)] lg:grid-cols-[repeat(7,8rem)] md:grid-rows-[repeat(5,5rem)] lg:grid-rows-[repeat(5,8rem)] border-black">
        {dayNumbers.map((num) => (
          <Day key={num} dayNumber={num} />
        ))}
      </div>
    </div>
  )
}

export default Calendar
