import { IpcMainEvent, IpcMainInvokeEvent, dialog } from 'electron'
import {
  writeFile,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'fs'
import { store } from './main'
import { Settings } from '../shared/settings'
import { getSettings } from './settings'
import path from 'node:path'

export const writeDiary = (
  _: IpcMainEvent,
  year: string,
  month: string,
  day: string,
  data: string
) => {
  const settings = getSettings()
  const diaryDayPath = path.join(
    settings.diaryLocation,
    `${year}/${month + 1}/${month + 1}-${day}-${year}.md`
  )

  writeFile(diaryDayPath, data, (err) => {
    if (err) {
      console.error('Error writing file:', err)
    }
  })
}

export const readDiary = (
  _: IpcMainInvokeEvent,
  year: string,
  month: string,
  day: string
) => {
  const settings = getSettings()
  const diaryDayPath = path.join(
    settings.diaryLocation,
    `${year}/${month + 1}/${month + 1}-${day}-${year}.md`
  )

  if (!existsSync(diaryDayPath)) {
    mkdirSync(path.join(settings.diaryLocation, `${year}/${month + 1}`), {
      recursive: true,
    })
    writeFileSync(diaryDayPath, '')
    return ''
  }
  return readFileSync(diaryDayPath).toString()
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
