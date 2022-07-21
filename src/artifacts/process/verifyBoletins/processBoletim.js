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
var processBoletim = function (db, appConfig, lastPublishes) { return __awaiter(void 0, void 0, void 0, function () {
    var configQueryBuilder, notificacoesQueryBuilder, notifyBe, nextBEList, beRepository, newNormalBeQueryBuilder, beContentsRepository, beContentsQueryBuilder, i, BE, newNormalBe, y, notifyBoletim, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 22, , 23]);
                if (!appConfig) return [3 /*break*/, 20];
                return [4 /*yield*/, db
                        .getRepository(Entities_1.Configuracoes)
                        .createQueryBuilder("config")];
            case 1:
                configQueryBuilder = _a.sent();
                return [4 /*yield*/, db
                        .getRepository(Entities_1.Notificacoes)
                        .createQueryBuilder("notificacoes")];
            case 2:
                notificacoesQueryBuilder = _a.sent();
                notifyBe = false;
                if (!(appConfig.lastBeId < lastPublishes.lastBeId)) return [3 /*break*/, 19];
                return [4 /*yield*/, (0, lib_1.GET)("".concat(app_1["default"].api.inr.boletimAfter, "/").concat(appConfig.lastBeId))];
            case 3:
                nextBEList = _a.sent();
                if (!(nextBEList.length > 0)) return [3 /*break*/, 19];
                return [4 /*yield*/, db.getRepository(Entities_1.Boletim)];
            case 4:
                beRepository = _a.sent();
                return [4 /*yield*/, beRepository.createQueryBuilder("be")];
            case 5:
                newNormalBeQueryBuilder = _a.sent();
                return [4 /*yield*/, db.getRepository(Entities_1.BoletimContents)];
            case 6:
                beContentsRepository = _a.sent();
                return [4 /*yield*/, beContentsRepository.createQueryBuilder("beContents")];
            case 7:
                beContentsQueryBuilder = _a.sent();
                i = 0;
                _a.label = 8;
            case 8:
                if (!(i < nextBEList.length)) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, lib_1.GET)("".concat(app_1["default"].api.inr.boletim, "/").concat(nextBEList[i].id))];
            case 9:
                BE = _a.sent();
                return [4 /*yield*/, newNormalBeQueryBuilder
                        .insert()
                        .values([
                        {
                            title: BE.titulo,
                            criadoEm: BE.criadoEm,
                            publicadoEm: BE.publicadoEm,
                            read: "N"
                        }
                    ])
                        .execute()];
            case 10:
                newNormalBe = _a.sent();
                y = 0;
                _a.label = 11;
            case 11:
                if (!(y < BE.contents.length)) return [3 /*break*/, 14];
                return [4 /*yield*/, beContentsQueryBuilder
                        .insert()
                        .values([
                        {
                            text: BE.contents[y].text,
                            url: BE.contents[y].url,
                            tipo: BE.contents[y].tipo,
                            boletim: newNormalBe.identifiers[0].id
                        }
                    ])
                        .execute()];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13:
                y++;
                return [3 /*break*/, 11];
            case 14: return [4 /*yield*/, notificacoesQueryBuilder
                    .insert()
                    .values([
                    {
                        createdAt: new Date(),
                        readed: false,
                        relatedDocumentId: newNormalBe.identifiers[0].id,
                        text: BE.titulo,
                        type: "B"
                    }
                ])
                    .execute()];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                i++;
                return [3 /*break*/, 8];
            case 17:
                notifyBe = true;
                return [4 /*yield*/, configQueryBuilder
                        .update()
                        .set({
                        lastBeId: lastPublishes.lastBeId
                    })
                        .where("id = :id", { id: 1 })
                        .execute()];
            case 18:
                _a.sent();
                _a.label = 19;
            case 19:
                notifyBoletim = appConfig.notifyBoletim;
                if (notifyBe && notifyBoletim) {
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
                return [3 /*break*/, 21];
            case 20: return [2 /*return*/, {
                    success: false,
                    notify: false
                }];
            case 21: return [3 /*break*/, 23];
            case 22:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        notify: false
                    }];
            case 23: return [2 /*return*/];
        }
    });
}); };
exports["default"] = processBoletim;
//# sourceMappingURL=processBoletim.js.map