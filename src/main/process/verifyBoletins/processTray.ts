import { BrowserWindow, Notification } from "electron"

const processTray = async (
  iconPath: string,
  beProcessResult: {
    success: boolean
    notify: boolean
  },
  clProcessResult: {
    success: boolean
    notify: boolean
  },
  window: BrowserWindow
): Promise<void> => {
  if (
    beProcessResult.success &&
    beProcessResult.notify &&
    clProcessResult.success &&
    clProcessResult.notify
  ) {
    const notificationVarios = new Notification({
      title: "Novo conteúdo disponível.",
      body: "novos conteúdos estão a disposição para leitura.",
      icon: iconPath,
      closeButtonText: "Inr Leitor"
    })
    notificationVarios.show()
    notificationVarios.on("click", event => {
      window.webContents.send("globalProcess", "/")
      window.maximize()
    })
  }

  if (
    beProcessResult.success &&
    beProcessResult.notify &&
    !clProcessResult.notify
  ) {
    const notificationBE = new Notification({
      title: "Novo boletim eletrônico disponível.",
      body: "Seu boletim eletrônico INR já está disponível para leitura.",
      icon: iconPath,
      closeButtonText: "Inr Leitor"
    })
    notificationBE.show()
    notificationBE.on("click", event => {
      window.webContents.send("globalProcess", "/boletins")
      window.maximize()
    })
  }

  if (
    !beProcessResult.notify &&
    clProcessResult.success &&
    clProcessResult.notify
  ) {
    const notificationCL = new Notification({
      title: "Novo Classificador disponível.",
      body: "Seu Classificador já está disponível para leitura.",
      icon: iconPath,
      subtitle: "INR Publicações",
      closeButtonText: "Inr Leitor"
    })
    notificationCL.show()
    notificationCL.on("click", event => {
      window.webContents.send("globalProcess", "/classificadores")
      window.maximize()
    })
  }
}

export default processTray
