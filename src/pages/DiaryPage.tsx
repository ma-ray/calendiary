import { useParams } from 'react-router-dom'

const DiaryPage = () => {
  const { year, month, day } = useParams()

  return (
    <div>
      <p>this is the diary page</p>
      <p>{`the day is ${year} ${month} ${day}`}</p>
    </div>
  )
}

export default DiaryPage
