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
var typeorm_1 = require("typeorm");
var Entities_1 = require("../../Entities");
exports["default"] = {
    name: "removeThisFavorite",
    processListener: true,
    handle: function (db, event, data) { return __awaiter(void 0, void 0, void 0, function () {
        var favoriteRepository, res, allFavListResponse, classificadorRepository, boletimRepository, be, cl, i, boletins_1, classificadores_1, _loop_1, i, _loop_2, ii, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    if (!event)
                        throw new Error("Connection is needed.");
                    return [4 /*yield*/, db.getRepository(Entities_1.Favoritos)];
                case 1:
                    favoriteRepository = _a.sent();
                    return [4 /*yield*/, favoriteRepository["delete"]({
                            idFavorito: data.id,
                            tipoFavorito: data.type
                        })];
                case 2:
                    _a.sent();
                    res = [];
                    return [4 /*yield*/, favoriteRepository.find({
                            where: {
                                tipoFavorito: data.type
                            },
                            order: {
                                idFavorito: "DESC"
                            }
                        })];
                case 3:
                    allFavListResponse = _a.sent();
                    if (!(allFavListResponse.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, db.getRepository(Entities_1.Classificador)];
                case 4:
                    classificadorRepository = _a.sent();
                    return [4 /*yield*/, db.getRepository(Entities_1.Boletim)];
                case 5:
                    boletimRepository = _a.sent();
                    be = [];
                    cl = [];
                    for (i = 0; i < allFavListResponse.length; i++) {
                        if (allFavListResponse[i].tipoFavorito === "B") {
                            be.push(allFavListResponse[i].idFavorito);
                        }
                        if (allFavListResponse[i].tipoFavorito === "C") {
                            cl.push(allFavListResponse[i].idFavorito);
                        }
                    }
                    return [4 /*yield*/, boletimRepository.find({
                            where: {
                                id: (0, typeorm_1.In)(be)
                            }
                        })];
                case 6:
                    boletins_1 = _a.sent();
                    return [4 /*yield*/, classificadorRepository.find({
                            where: {
                                id: (0, typeorm_1.In)(cl)
                            }
                        })];
                case 7:
                    classificadores_1 = _a.sent();
                    _loop_1 = function (i) {
                        var hasBe = be.findIndex(function (item) { return item === boletins_1[i].id; });
                        if (hasBe > -1) {
                            res.push({
                                id: boletins_1[i].id,
                                titulo: boletins_1[i].title,
                                idFavorito: boletins_1[i].id,
                                data: boletins_1[i].publicadoEm.toString(),
                                type: "B"
                            });
                        }
                    };
                    for (i = 0; i < boletins_1.length; i++) {
                        _loop_1(i);
                    }
                    _loop_2 = function (ii) {
                        var hasCl = cl.findIndex(function (item) { return item === classificadores_1[ii].id; });
                        if (hasCl > -1) {
                            res.push({
                                id: classificadores_1[ii].id,
                                titulo: classificadores_1[ii].title,
                                idFavorito: classificadores_1[ii].id,
                                data: classificadores_1[ii].publicadoEm.toString(),
                                type: "C"
                            });
                        }
                    };
                    for (ii = 0; ii < classificadores_1.length; ii++) {
                        _loop_2(ii);
                    }
                    return [2 /*return*/, event.sender.send("reloadFavoritos", res)];
                case 8: return [2 /*return*/, event.sender.send("reloadFavoritos", [])];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    event === null || event === void 0 ? void 0 : event.sender.send("reloadFavoritos", false);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=index.js.map