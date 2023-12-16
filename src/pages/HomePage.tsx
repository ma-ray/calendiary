import Calendar from '../components/Calendar'

const HomePage = () => {
  return (
    <div className="h-screen">
      <div className="absolute left-0 top-0 p-6">
        <h1 className="text-xl">home page</h1>
      </div>
      <div className="flex justify-center items-center h-full">
        <Calendar month={11} year={2023} />
      </div>
    </div>
  )
}

export default HomePage
