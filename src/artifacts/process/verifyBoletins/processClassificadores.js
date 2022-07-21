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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("../../config/app"));
var Entities_1 = require("../../Entities");
var lib_1 = require("../../lib");
var processClassificadores = function (db, appConfig, lastPublishes) { return __awaiter(void 0, void 0, void 0, function () {
    var configQueryBuilder, notificacoesQueryBuilder, notifyClass, nextCLList, clQueryBuilder, clContentsQueryBuilder, c, CL, newNormalClass, d, notifyClassificador, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 19, , 20]);
                if (!appConfig) return [3 /*break*/, 17];
                return [4 /*yield*/, db
                        .getRepository(Entities_1.Configuracoes)
                        .createQueryBuilder()];
            case 1:
                configQueryBuilder = _a.sent();
                return [4 /*yield*/, db
                        .getRepository(Entities_1.Notificacoes)
                        .createQueryBuilder()];
            case 2:
                notificacoesQueryBuilder = _a.sent();
                notifyClass = false;
                if (!(appConfig.lastClassId < lastPublishes.lastClassId)) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, lib_1.GET)("".concat(app_1["default"].api.inr.classificadorAfter, "/").concat(appConfig.lastClassId))];
            case 3:
                nextCLList = _a.sent();
                if (!(nextCLList.length > 0)) return [3 /*break*/, 16];
                return [4 /*yield*/, db
                        .getRepository(Entities_1.Classificador)
                        .createQueryBuilder("cl")];
            case 4:
                clQueryBuilder = _a.sent();
                return [4 /*yield*/, db
                        .getRepository(Entities_1.ClassificadorContents)
                        .createQueryBuilder("clContents")];
            case 5:
                clContentsQueryBuilder = _a.sent();
                c = 0;
                _a.label = 6;
            case 6:
                if (!(c < nextCLList.length)) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, lib_1.GET)("".concat(app_1["default"].api.inr.classificador, "/").concat(nextCLList[c].id))];
            case 7:
                CL = _a.sent();
                return [4 /*yield*/, clQueryBuilder
                        .insert()
                        .values([
                        {
                            title: CL.titulo,
                            criadoEm: CL.criadoEm,
                            publicadoEm: CL.publicadoEm,
                            read: "N"
                        }
                    ])
                        .execute()];
            case 8:
                newNormalClass = _a.sent();
                return [4 /*yield*/, notificacoesQueryBuilder
                        .insert()
                        .values([
                        {
                            createdAt: new Date(),
                            readed: false,
                            relatedDocumentId: newNormalClass.identifiers[0].id,
                            text: CL.titulo,
                            type: "C"
                        }
                    ])
                        .execute()];
            case 9:
                _a.sent();
                d = 0;
                _a.label = 10;
            case 10:
                if (!(d < CL.contents.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, clContentsQueryBuilder
                        .insert()
                        .values([
                        {
                            classificador: newNormalClass.identifiers[0].id,
                            tipo: CL.contents[d].tipo,
                            url: CL.contents[d].url
                        }
                    ])
                        .execute()];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12:
                d++;
                return [3 /*break*/, 10];
            case 13:
                c++;
                return [3 /*break*/, 6];
            case 14:
                notifyClass = true;
                return [4 /*yield*/, configQueryBuilder
                        .update()
                        .set({
                        lastClassId: lastPublishes.lastClassId
                    })
                        .where("id = :id", { id: 1 })
                        .execute()];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                notifyClassificador = appConfig.notifyClassificador;
                if (notifyClass && notifyClassificador) {
                    return [2 /*return*/, {
                            success: true,
                            notify: true
                        }];
                }
                else {
                    return [2 /*return*/, {
                            success: true,
                            notify: false
                        }];
                }
                return [3 /*break*/, 18];
            case 17: return [2 /*return*/, {
                    success: false,
                    notify: false
                }];
            case 18: return [3 /*break*/, 20];
            case 19:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        notify: false
                    }];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports["default"] = processClassificadores;
//# sourceMappingURL=processClassificadores.js.map