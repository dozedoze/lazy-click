const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  ping: () => ipcRenderer.invoke("ping"),
});
