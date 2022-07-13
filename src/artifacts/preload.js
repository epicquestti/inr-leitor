"use strict";
exports.__esModule = true;
exports.process = void 0;
var electron_1 = require("electron");
exports.process = {
    checkDbStatus: function () {
        electron_1.ipcRenderer.send("checkDbStatus");
    },
    send: function (name, data) {
        electron_1.ipcRenderer.send(name, data);
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    on: function (channel, callback) {
        electron_1.ipcRenderer.on(channel, function (_, data) { return callback(data); });
    }
};
electron_1.contextBridge.exposeInMainWorld("Main", exports.process);
//# sourceMappingURL=preload.js.map