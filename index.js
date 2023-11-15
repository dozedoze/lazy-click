const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("node:path");

const { createAutoClick } = require("./auto-click");

// 全局快捷键
const SHOW_SHORT_CUT = "CmdOrCtrl+1";
const QUICK_QUIT = "Esc";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
  console.log(win, 'win')
  win.loadFile("index.html");

  const autoClick = createAutoClick(1000);

  globalShortcut.register(QUICK_QUIT, () => {
    win.restore();
    autoClick.end();
  });

  const ret = globalShortcut.register(SHOW_SHORT_CUT, () => {
    const isVisible = win.isVisible();
    if (isVisible) {
      win.minimize();
      autoClick.start();
    } else {
      win.restore();
      autoClick.end();
    }
  });
  if (!ret) {
    console.log("registration failed");
  }
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("ping", () => "pong");
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
