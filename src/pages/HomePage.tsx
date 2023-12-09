import Calendar from '../components/Calendar'

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>home page</p>
      <Calendar month={11} year={2023} />
    </div>
  )
}

export default HomePage
