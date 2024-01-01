import { IpcMainEvent } from 'electron'
import { writeFile, readFileSync } from 'fs'

export const writeDiary = (_: IpcMainEvent, data: string) => {
  writeFile('C:\\Dev\\calendiary\\test.md', data, (err) => {
    if (err) {
      console.error('Error writing file:', err)
    }
  })
}

export const readDiary = () =>
  readFileSync('C:\\Dev\\calendiary\\test.md').toString()
