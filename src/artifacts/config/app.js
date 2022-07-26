"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = !electron_1.app.isPackaged;
// ? "https://homolog.publicacoesinr.com.br/api"
var base = isDev
    ? "http://localhost:3000/api"
    : "https://production.publicacoesinr.com.br/api";
exports["default"] = {
    api: {
        inr: {
            base: base,
            lastPublishes: "".concat(base, "/last-publishes"),
            boletimAfter: "".concat(base, "/publicacoes/boletim/after/"),
            boletim: "".concat(base, "/publicacoes/boletim/"),
            classificadorAfter: "".concat(base, "/publicacoes/classificador/after/"),
            classificador: "".concat(base, "/publicacoes/classificador/"),
            sendReport: "".concat(base, "/suporte/reportar")
        }
    }
};
//# sourceMappingURL=app.js.map