import { IpcMainEvent, dialog } from 'electron'
import { writeFile, readFileSync } from 'fs'
import { store } from './main'
import { Settings } from '../shared/settings'

export const writeDiary = (_: IpcMainEvent, data: string) => {
  writeFile('C:\\Dev\\calendiary\\test.md', data, (err) => {
    if (err) {
      console.error('Error writing file:', err)
    }
  })
}

export const readDiary = () =>
  readFileSync('C:\\Dev\\calendiary\\test.md').toString()

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
