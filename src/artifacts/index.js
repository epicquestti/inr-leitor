"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var electron_1 = require("electron");
var electron_next_1 = __importDefault(require("electron-next"));
var path = __importStar(require("path"));
var lib_1 = require("./lib");
var allProcess = __importStar(require("./process"));
var window;
var isDev = !electron_1.app.isPackaged;
var iconPath = "".concat(path.join(__dirname, "../assets/windowIcon.png"));
var userDataPath = electron_1.app.getPath("userData");
var databasePath = path.join(userDataPath, "doc_app-0-3.sqlite");
var intervalValue = isDev ? 10000 : 600000;
var appVersion = electron_1.app.getVersion();
var quiting = false;
var tray;
var connection;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
electron_1.powerSaveBlocker.start("prevent-app-suspension");
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.exit();
}
else {
    electron_1.app.on("second-instance", function () {
        if (window) {
            if (window.isMinimized())
                window.restore();
            window.show();
            // window.focus()
        }
    });
}
var processList = Object.values(allProcess).map(function (process) { return ({
    name: process.name,
    handle: process.handle,
    processListener: process.processListener
}); });
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, electron_next_1["default"])("src/renderer")];
                case 1:
                    _a.sent();
                    window = new electron_1.BrowserWindow({
                        height: 720,
                        width: 1460,
                        webPreferences: {
                            backgroundThrottling: false,
                            nodeIntegration: true,
                            preload: path.join(__dirname, "preload.js"),
                            contextIsolation: true
                        },
                        icon: iconPath
                    });
                    electron_1.Menu.setApplicationMenu(null);
                    isDev && window.webContents.openDevTools({ mode: "undocked" });
                    url = isDev
                        ? "http://localhost:8000/"
                        : "file:///".concat(path.join(__dirname, "../renderer/out/index.html"));
                    window.loadURL(url);
                    window.on("minimize", function (event) {
                        event.preventDefault();
                        window && window.minimize();
                    });
                    window.on("close", function (event) {
                        event.preventDefault();
                        if (quiting) {
                            electron_1.app.exit();
                        }
                        else {
                            window && window.hide();
                        }
                        return false;
                    });
                    window.on("closed", function () {
                        window = null;
                        tray && (tray === null || tray === void 0 ? void 0 : tray.destroy());
                    });
                    return [4 /*yield*/, (0, lib_1.initDb)(databasePath)];
                case 2:
                    connection = _a.sent();
                    return [4 /*yield*/, allProcess.configurationProcess.handle(connection)];
                case 3:
                    _a.sent();
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, allProcess.verifyBoletins.handle(connection, null, {
                                        iconPath: iconPath,
                                        appVersion: appVersion,
                                        window: window
                                    }, false)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, intervalValue);
                    return [2 /*return*/];
            }
        });
    });
}
function createTray() {
    return __awaiter(this, void 0, void 0, function () {
        var icon, contextMenu;
        return __generator(this, function (_a) {
            icon = electron_1.nativeImage.createFromPath(iconPath);
            tray = new electron_1.Tray(icon);
            contextMenu = electron_1.Menu.buildFromTemplate([
                {
                    label: "Classificadores",
                    type: "normal",
                    click: function () {
                        window.webContents.send("globalProcess", "/classificadores");
                        window.maximize();
                    }
                },
                {
                    label: "Boletins",
                    type: "normal",
                    click: function () {
                        window.webContents.send("globalProcess", "/boletins");
                        window.maximize();
                    }
                },
                { type: "separator" },
                {
                    label: "Fechar",
                    type: "normal",
                    click: function () {
                        quiting = true;
                        electron_1.app.quit();
                    }
                }
            ]);
            tray.on("double-click", function () {
                window && (window === null || window === void 0 ? void 0 : window.show());
            });
            tray.setContextMenu(contextMenu);
            tray.setToolTip("INR Publicações");
            tray.setTitle("INR Publicações");
            return [2 /*return*/];
        });
    });
}
function registerListeners() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            try {
                processList.forEach(function (p) {
                    if (p.processListener) {
                        electron_1.ipcMain.on(p.name, function (e, data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, p.handle(connection, e, data)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                });
                electron_1.ipcMain.on("clientVerifyBoletins", function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, allProcess.verifyBoletins.handle(connection, e, {
                                    iconPath: iconPath,
                                    appVersion: appVersion,
                                    window: window
                                }, true)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // close App
                electron_1.ipcMain.on("CloseApp", function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        quiting = true;
                        electron_1.app.quit();
                        return [2 /*return*/];
                    });
                }); });
            }
            catch (error) {
                console.log("Error to register listeners");
            }
            return [2 /*return*/];
        });
    });
}
function AllWindowClosed() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (process.platform !== "darwin") {
                electron_1.app.quit();
            }
            return [2 /*return*/];
        });
    });
}
function activateApp() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (electron_1.BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
            return [2 /*return*/];
        });
    });
}
electron_1.app.setLoginItemSettings({
    name: "Leitor INR",
    openAtLogin: true,
    path: electron_1.app.getPath("exe")
});
electron_1.app
    .on("ready", createWindow)
    .on("window-all-closed", AllWindowClosed)
    .on("activate", activateApp)
    .whenReady()
    .then(registerListeners)
    .then(createTray)["catch"](function (e) { return console.error(e); });
//# sourceMappingURL=index.js.map