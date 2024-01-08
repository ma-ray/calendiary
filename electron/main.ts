import { app, BrowserWindow, ipcMain, Menu, MenuItem, shell } from 'electron'
import path from 'node:path'
import {
  availableEntries,
  doesDiaryDayExist,
  doesDiaryPathExist,
  openDirectory,
  readDiary,
  showDiaryInExplorer,
  showDiaryPageInExplorer,
  writeDiary,
} from './editor'
import { getSettings } from './settings'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: false,
    },
  })

  win.removeMenu()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  win.webContents.on('context-menu', (_, params) => {
    const menu = new Menu()
    if (params.isEditable) {
      menu.append(new MenuItem({ label: 'Copy', role: 'copy' }))
      menu.append(new MenuItem({ label: 'Cut', role: 'cut' }))
      menu.append(new MenuItem({ label: 'Paste', role: 'paste' }))
      menu.popup()
    }
  })
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      win.focus()
    }
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  ipcMain.on('write-diary', writeDiary)
  ipcMain.handle('read-diary', readDiary)
  ipcMain.handle('open-directory', openDirectory)
  ipcMain.handle('get-settings', getSettings)
  ipcMain.handle('does-diary-day-exist', doesDiaryDayExist)
  ipcMain.handle('available-entries', availableEntries)
  ipcMain.on('show-diary-in-explorer', showDiaryInExplorer)
  ipcMain.on('show-diary-page-in-explorer', showDiaryPageInExplorer)
  ipcMain.handle('does-diary-path-exist', doesDiaryPathExist)

  createWindow()
})
