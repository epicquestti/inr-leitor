import { contextBridge, ipcRenderer } from "electron"
export const process = {
  checkDbStatus: () => {
    ipcRenderer.send("checkDbStatus")
  },

  send: (name: string, data: any) => {
    ipcRenderer.send(name, data)
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}
contextBridge.exposeInMainWorld("Main", process)
