"use strict";
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
exports.__esModule = true;
var Entities_1 = require("../../Entities");
exports["default"] = {
    name: "getClassificadorById",
    processListener: true,
    handle: function (db, event, data) { return __awaiter(void 0, void 0, void 0, function () {
        var clRepository, cl, clContentsRepository, clContents, classificador, notificacoesRepository, notificacaoToUpdate, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    if (!event)
                        throw new Error("Connection is needed.");
                    return [4 /*yield*/, db.getRepository(Entities_1.Classificador)];
                case 1:
                    clRepository = _a.sent();
                    return [4 /*yield*/, clRepository.findOne({
                            where: {
                                id: data === null || data === void 0 ? void 0 : data.id
                            },
                            select: {
                                id: true,
                                title: true,
                                criadoEm: true,
                                publicadoEm: true,
                                read: true
                            }
                        })];
                case 2:
                    cl = _a.sent();
                    return [4 /*yield*/, db.getRepository(Entities_1.ClassificadorContents)];
                case 3:
                    clContentsRepository = _a.sent();
                    return [4 /*yield*/, clContentsRepository.find({
                            where: {
                                classificador: {
                                    id: data === null || data === void 0 ? void 0 : data.id
                                }
                            },
                            select: {
                                id: true,
                                tipo: true,
                                url: true,
                                text: true
                            }
                        })];
                case 4:
                    clContents = _a.sent();
                    if (!cl)
                        throw new Error("No Classificado finded.");
                    classificador = {
                        id: cl.id,
                        title: cl.title,
                        criadoEm: cl.criadoEm,
                        publicadoEm: cl.publicadoEm,
                        read: cl.read,
                        contents: clContents.map(function (item) { return ({
                            id: item.id,
                            tipo: item.tipo,
                            url: item.url,
                            text: item.text
                        }); })
                    };
                    cl.read = "S";
                    return [4 /*yield*/, clRepository.save(cl)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.getRepository(Entities_1.Notificacoes)];
                case 6:
                    notificacoesRepository = _a.sent();
                    return [4 /*yield*/, notificacoesRepository.findOne({
                            where: {
                                relatedDocumentId: cl.id,
                                type: "C"
                            }
                        })];
                case 7:
                    notificacaoToUpdate = _a.sent();
                    if (!notificacaoToUpdate) return [3 /*break*/, 9];
                    notificacaoToUpdate.readed = true;
                    return [4 /*yield*/, notificacoesRepository.save(notificacaoToUpdate)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    event.sender.send("relaodClassificador", classificador);
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    event === null || event === void 0 ? void 0 : event.sender.send("relaodClassificador", false);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=index.js.map