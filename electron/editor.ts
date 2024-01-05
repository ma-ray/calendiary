import { IpcMainEvent, IpcMainInvokeEvent, dialog } from 'electron'
import { store } from './main'
import { Settings } from '../shared/settings'
import { getSettings } from './settings'
import path from 'node:path'
import { access, mkdir, readFile, writeFile } from 'fs/promises'

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
  try {
    await access(diaryDayPath)
    return true
  } catch (error) {
    return false
  }
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
