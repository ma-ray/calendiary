import { IpcMainEvent, IpcMainInvokeEvent, dialog, shell } from 'electron'
import { store } from './main'
import { Settings } from '../shared/settings'
import { getSettings } from './settings'
import path from 'node:path'
import { access, mkdir, readFile, writeFile, readdir } from 'fs/promises'
import moment from 'moment'

export const writeDiary = (
  _: IpcMainEvent,
  year: string,
  month: string,
  day: string,
  data: string
) => {
  const settings = getSettings()
  const trueMonth = parseInt(month) + 1
  const diaryDayPath = path.join(
    settings.diaryLocation,
    `${year}/${trueMonth}/${day}/${trueMonth}-${day}-${year}.md`
  )

  return writeFile(diaryDayPath, data)
}

export const readDiary = async (
  _: IpcMainInvokeEvent,
  year: string,
  month: string,
  day: string
) => {
  const settings = getSettings()
  const trueMonth = parseInt(month) + 1
  const diaryDayPath = path.join(
    settings.diaryLocation,
    `${year}/${trueMonth}/${day}/${trueMonth}-${day}-${year}.md`
  )

  try {
    await access(diaryDayPath)
  } catch (error) {
    await mkdir(
      path.join(settings.diaryLocation, `${year}/${trueMonth}/${day}`),
      {
        recursive: true,
      }
    )
    await writeFile(diaryDayPath, '')
    return ''
  }

  const content = await readFile(diaryDayPath, 'utf-8')
  return content
}

export const doesDiaryDayExist = async (
  _: IpcMainInvokeEvent,
  year: string,
  month: string,
  day: string
) => {
  const settings = getSettings()
  const trueMonth = parseInt(month) + 1
  const diaryDayPath = path.join(
    settings.diaryLocation,
    `${year}/${trueMonth}/${day}/${trueMonth}-${day}-${year}.md`
  )
  return await doesFileExist(diaryDayPath)
}

export const openDirectory = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  })
  if (!canceled) {
    const oldSettings = store.has('settings')
      ? (store.get('settings') as Settings)
      : {}
    store.set('settings', {
      ...oldSettings,
      diaryLocation: filePaths[0],
    })
    return true
  }
  return false
}

const doesFileExist = async (path: string) => {
  try {
    await access(path)
    return true
  } catch (error) {
    return false
  }
}

export const availableEntries = async (_: IpcMainInvokeEvent, year: number) => {
  const diaryPath = getSettings().diaryLocation
  const availableEntries = new Set<string>()

  if (!(await doesFileExist(path.join(diaryPath, `${year}`)))) {
    return availableEntries
  }

  const months = (await readdir(path.join(diaryPath, `${year}`))).filter(
    (month) => {
      return parseInt(month) < 13 && parseInt(month) > 0
    }
  )

  await Promise.all(
    months.map(async (month) => {
      const days = (
        await readdir(path.join(diaryPath, `${year}/${month}`))
      ).filter((d) => {
        const daysInMonth = moment([year, parseInt(month) - 1]).daysInMonth()
        const day = parseInt(d)
        return day > 0 && day <= daysInMonth
      })

      await Promise.all(
        days.map(async (day) => {
          const diaryDayPath = path.join(
            diaryPath,
            `${year}/${month}/${day}/${month}-${day}-${year}.md`
          )

          if (await doesFileExist(diaryDayPath)) {
            availableEntries.add(`${month}-${day}-${year}`)
          }
        })
      )
    })
  )

  return availableEntries
}

export const showDiaryInExplorer = () => {
  const diaryPath = getSettings().diaryLocation
  shell.openPath(diaryPath)
}

export const showDiaryPageInExplorer = async (
  _: IpcMainEvent,
  year: string,
  month: string,
  day: string
) => {
  const diaryPath = getSettings().diaryLocation
  const trueMonth = parseInt(month) + 1
  const diaryDayPath = path.join(
    diaryPath,
    `${year}/${trueMonth}/${day}/${trueMonth}-${day}-${year}.md`
  )
  if (await doesFileExist(diaryDayPath)) {
    shell.showItemInFolder(diaryDayPath)
  }
}
