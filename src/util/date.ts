import moment from 'moment'

export const months = [
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

export const dateStatus = (day: string, month: string, year: string) => {
  const inputDate = moment([parseInt(year), parseInt(month), parseInt(day)])

  const currentDate = moment().startOf('day')
  const daysDifference = inputDate.diff(currentDate, 'days')

  if (daysDifference === 0) {
    return 'today'
  } else if (daysDifference === 1) {
    return 'tomorrow'
  } else if (daysDifference > 1 && daysDifference < 7) {
    return 'a couple days from now'
  } else if (daysDifference >= 7) {
    return 'many days from now'
  } else if (daysDifference === -1) {
    return 'yesterday'
  } else if (daysDifference <= -2 && daysDifference >= -6) {
    return 'a couple days ago'
  } else {
    return 'many days ago'
  }
}

export const getNextDayLink = (day: string, month: string, year: string) => {
  const currentDate = moment([
    parseInt(year),
    parseInt(month),
    parseInt(day),
  ]).add(1, 'd')
  return `/diary/${currentDate.get('year')}/${currentDate.get(
    'month'
  )}/${currentDate.get('date')}`
}

export const getPreviousDayLink = (
  day: string,
  month: string,
  year: string
) => {
  const currentDate = moment([
    parseInt(year),
    parseInt(month),
    parseInt(day),
  ]).subtract(1, 'd')
  return `/diary/${currentDate.get('year')}/${currentDate.get(
    'month'
  )}/${currentDate.get('date')}`
}

export const isDateValid = (year: number, month: number, day: number) =>
  moment([year, month, day]).isValid()

export const getPercentageOfDay = () => {
  const currentTime = moment()
  const startOfDay = moment().startOf('day')
  const endOfDay = moment().endOf('day')

  const elapsedMilliseconds = currentTime.diff(startOfDay)
  const totalMillisecondsInDay = endOfDay.diff(startOfDay)

  const percentageOfDay = (elapsedMilliseconds / totalMillisecondsInDay) * 100

  return percentageOfDay
}
