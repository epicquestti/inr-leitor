import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  nativeImage,
  powerSaveBlocker,
  shell,
  Tray
} from "electron"
import prepareNext from "electron-next"
import * as path from "path"
import { DataSource } from "typeorm"
import {
  favoriteThisClassificador,
  getClassificadorById,
  getClassificadoresList,
  getFavoriteList,
  getNotifications,
  removeThisFavorite
} from "./process"
import {
  favoriteThisBE,
  getBoletimList,
  getThisBoletimById
} from "./process/comunication"
import {
  changeNotifyBE,
  changeNotifyCL,
  fisrtConfiguration,
  initiCarrourcel,
  verifyBoletins
} from "./process/main"
let window: BrowserWindow | null
const isDev = !app.isPackaged
const iconPath = `${path.join(__dirname, "../assets/windowIcon.png")}`
let quiting = false
let tray: Tray | null
let connection: DataSource | null

powerSaveBlocker.start("prevent-app-suspension")
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"

if (require("electron-squirrel-startup")) app.quit()

async function previneSecondInstance() {
  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on("second-instance", () => {
      if (window) {
        if (window.isMinimized()) window.restore()
        window.focus()
      }
    })
  }
}

async function createWindow() {
  await prepareNext("src/renderer")
  window = new BrowserWindow({
    height: 720,
    width: 1024,
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
    : `file:///${path.join(__dirname, "../../src/renderer/out/index.html")}`

  // window.loadFile(path.join(__dirname, "../../src/renderer/out/index.html"))
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

  await fisrtConfiguration()

  setInterval(async () => {
    await verifyBoletins(iconPath)
  }, 3000)
}

async function createTray() {
  const icon = nativeImage.createFromPath(iconPath)

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    // { label: "Classificadores", type: "normal", click: function () {} },
    // { label: "Boletins", type: "normal" },
    // { type: "separator" },
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
    ipcMain.on("checkDbStatus", e => {
      e.sender.send("checkDbStatusResponse", {
        dbConnected: connection?.isInitialized
      })
    })

    ipcMain.on("openInBrowser", async (_, data) => {
      await shell.openExternal(data)
    })

    ipcMain.on(favoriteThisClassificador.name, async (e, data) => {
      await favoriteThisClassificador.handle(e, data)
    })

    ipcMain.on(getClassificadoresList.name, async (e, data) => {
      await getClassificadoresList.handle(e, data)
    })

    ipcMain.on(getClassificadorById.name, async (e, data) => {
      await getClassificadorById.handle(e, data)
    })
    // getFavoriteList
    ipcMain.on(getFavoriteList.name, async (e, data) => {
      await getFavoriteList.handle(data, e)
    })

    // removeThisFavorite
    ipcMain.on(removeThisFavorite.name, async (e, data) => {
      await removeThisFavorite.handle(data, e)
    })

    // getBoletimList
    ipcMain.on(getBoletimList.name, async (e, data) => {
      await getBoletimList.handle(e, data)
    })

    // getThisBoletimById
    ipcMain.on(getThisBoletimById.name, async (e, data) => {
      await getThisBoletimById.handle(e, data)
    })

    // favoriteThisBE
    ipcMain.on(favoriteThisBE.name, async (e, data) => {
      await favoriteThisBE.handle(e, data)
    })

    // initiCarrourcel
    ipcMain.on(initiCarrourcel.name, async e => {
      await initiCarrourcel.handle(e)
    })

    // changeNotifyBE
    ipcMain.on(changeNotifyBE.name, async (e, data) => {
      await changeNotifyBE.handle(data, e)
    })

    // favoriteThisBE
    ipcMain.on(changeNotifyCL.name, async (e, data) => {
      await changeNotifyCL.handle(data, e)
    })

    // getNotifications
    ipcMain.on(getNotifications.name, async e => {
      await getNotifications.handle(e)
    })
  } catch (error) {
    console.log("Error to register listeners")
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app
  .on("second-instance", previneSecondInstance)
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .then(createTray)
  .catch(e => console.error(e))
