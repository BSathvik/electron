const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

process.on('uncaughtException', (e) => {
  console.error(e)
  process.exit(1)
})

app.disableElectronSiteInstanceOverrides = JSON.parse(process.argv[2])

const pids = []
let win

ipcMain.on('pid', (event, pid) => {
  pids.push(pid)
  if (pids.length === 2) {
    console.log(JSON.stringify(pids))
    if (win) win.close()
    app.quit()
  } else {
    if (win) win.reload()
  }
})

app.whenReady().then(() => {
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
})