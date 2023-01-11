import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  powerSaveBlocker,
  Tray
} from "electron"
import prepareNext from "electron-next"
import * as path from "path"
import { DataSource } from "typeorm"
import { initDb } from "./lib"
import * as allProcess from "./process"
let window: BrowserWindow | null
const isDev = !app.isPackaged
const iconPath = `${path.join(__dirname, "../assets/windowIcon.png")}`
const userDataPath = app.getPath("userData")
const databasePath = path.join(userDataPath, "doc_app-0-3.sqlite")
const intervalValue = isDev ? 10000 : 600000
const appVersion = app.getVersion()
let quiting = false
let tray: Tray | null
let connection: DataSource | null
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
powerSaveBlocker.start("prevent-app-suspension")

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.exit()
} else {
  app.on("second-instance", () => {
    if (window) {
      if (window.isMinimized()) window.restore()
      window.show()
      // window.focus()
    }
  })
}

const processList = Object.values(allProcess).map(process => ({
  name: process.name,
  handle: process.handle,
  processListener: process.processListener
}))

async function createWindow() {
  await prepareNext("src/renderer")

  window = new BrowserWindow({
    height: 720,
    width: 1460,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    },
    icon: iconPath
  })

  Menu.setApplicationMenu(null)

  isDev && window.webContents.openDevTools({ mode: "undocked" })

  const url = isDev
    ? "http://localhost:8000/"
    : `file:///${path.join(__dirname, "../renderer/out/index.html")}`

  window.loadURL(url)

  window.on("minimize", function (event: any) {
    event.preventDefault()
    window && window.minimize()
  })

  window.on("close", function (event) {
    event.preventDefault()

    if (quiting) {
      app.exit()
    } else {
      window && window.hide()
    }
    return false
  })

  window.on("closed", () => {
    window = null
    tray && tray?.destroy()
  })

  connection = await initDb(databasePath)

  await allProcess.configurationProcess.handle(connection)

  setInterval(async () => {
    await allProcess.verifyBoletins.handle(
      connection,
      null,
      {
        iconPath,
        appVersion,
        window
      },
      false
    )
  }, intervalValue)
}

async function createTray() {
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Classificadores",
      type: "normal",
      click: function () {
        window.webContents.send("globalProcess", "/classificadores")
        window.maximize()
      }
    },
    {
      label: "Boletins",
      type: "normal",
      click: function () {
        window.webContents.send("globalProcess", "/boletins")
        window.maximize()
      }
    },
    { type: "separator" },
    {
      label: "Fechar",
      type: "normal",
      click: function () {
        quiting = true
        app.quit()
      }
    }
  ])
  tray.on("double-click", () => {
    window && window?.show()
  })
  tray.setContextMenu(contextMenu)
  tray.setToolTip("INR Publicações")
  tray.setTitle("INR Publicações")
}

async function registerListeners() {
  try {
    processList.forEach(p => {
      if (p.processListener) {
        ipcMain.on(p.name, async (e, data) => {
          await p.handle(connection, e, data)
        })
      }
    })

    ipcMain.on("clientVerifyBoletins", async e => {
      await allProcess.verifyBoletins.handle(
        connection,
        e,
        {
          iconPath,
          appVersion,
          window
        },
        true
      )
    })

    // close App
    ipcMain.on("CloseApp", async e => {
      quiting = true
      app.quit()
    })
  } catch (error) {
    console.log("Error to register listeners")
  }
}

async function AllWindowClosed() {
  if (process.platform !== "darwin") {
    app.quit()
  }
}

async function activateApp() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}

app.setLoginItemSettings({
  name: "Leitor INR",
  openAtLogin: true,
  path: app.getPath("exe")
})

app
  .on("ready", createWindow)
  .on("window-all-closed", AllWindowClosed)
  .on("activate", activateApp)
  .whenReady()
  .then(registerListeners)
  .then(createTray)
  .catch(e => console.error(e))
