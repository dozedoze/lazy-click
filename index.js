const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Notification,
} = require("electron");
const path = require("node:path");

const { createAutoClick } = require("./auto-click");

// 全局快捷键
const SHOW_SHORT_CUT = "CmdOrCtrl+1";
const QUICK_QUIT = "Esc";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 450,
    height: 220,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
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

  const notice = new Notification({
    title: "提示",
    body: "按 esc 或者快捷键退出",
  });

  ipcMain.on("my-test-start", (event, timeout) => {
    notice.show();
    setTimeout(() => {
      notice.close();
    }, 1500);
    autoClick.changeTimeOut(timeout);
    win.minimize();
    autoClick.start();
  });

  if (!ret) {
    console.log("registration failed");
  }
};

app.whenReady().then(() => {
  createWindow();

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
  // 注销所有快捷键和监听事件
  globalShortcut.unregisterAll();
  ipcMain.removeAllListeners();
});
