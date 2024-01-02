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
