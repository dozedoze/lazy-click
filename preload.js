const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("times", {
  setClickTime: (time) => ipcRenderer.send("my-test-start", time),
  version: process.version,
});
