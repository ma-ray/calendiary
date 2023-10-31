type DayProps = {
  dayNumber: number
}

const Day: React.FC<DayProps> = ({ dayNumber }) => {
  return (
    <div className="flex items-center justify-center border border-black">
      <h4 className="scroll-m-20 text-2xl font-medium tracking-tight">
        {dayNumber}
      </h4>
    </div>
  )
}

const Calendar = () => {
  const dayNumbers = Array.from({ length: 35 }, (_, index) => index + 1)

  return (
    <div className="inline-block">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        october 2023
      </h1>
      <div className="grid md:grid-cols-[repeat(7,5rem)] lg:grid-cols-[repeat(7,8rem)] text-center">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          sun
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          mon
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          tue
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          wed
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          thu
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          fri
        </h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          sat
        </h4>
      </div>
      <div className="border border-black grid md:grid-cols-[repeat(7,5rem)] lg:grid-cols-[repeat(7,8rem)] md:grid-rows-[repeat(5,5rem)] lg:grid-rows-[repeat(5,8rem)]">
        {dayNumbers.map((num) => (
          <Day key={num} dayNumber={num} />
        ))}
      </div>
    </div>
  )
}

export default Calendar
