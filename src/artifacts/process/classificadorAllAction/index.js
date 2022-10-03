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
    name: "classificadorAllAction",
    processListener: true,
    handle: function (db, event, data) { return __awaiter(void 0, void 0, void 0, function () {
        var classificadorRepository, classificadorQueryBuilder, count, response, filterResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!event)
                        throw new Error("event is needed.");
                    if (!data)
                        throw new Error("data is needed.");
                    return [4 /*yield*/, db.getRepository(Entities_1.Classificador)];
                case 1:
                    classificadorRepository = _a.sent();
                    return [4 /*yield*/, classificadorRepository.createQueryBuilder("classificador")];
                case 2:
                    classificadorQueryBuilder = _a.sent();
                    return [4 /*yield*/, classificadorQueryBuilder
                            .update()
                            .set({ read: data.readState })
                            .execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, classificadorRepository.count({
                            where: {
                                title: (0, typeorm_1.Like)("%".concat(data.text, "%"))
                            }
                        })];
                case 4:
                    count = _a.sent();
                    return [4 /*yield*/, classificadorRepository.find({
                            where: {
                                title: (0, typeorm_1.Like)("%".concat(data.text, "%"))
                            },
                            order: {
                                publicadoEm: "DESC"
                            },
                            take: data.limit,
                            skip: data.page * data.limit
                        })];
                case 5:
                    response = _a.sent();
                    filterResults = response.map(function (item) {
                        return {
                            id: item.id,
                            title: item.title,
                            criadoEm: item.criadoEm.toLocaleDateString(),
                            publicadoEm: item.publicadoEm.toLocaleDateString(),
                            read: item.read === "S" ? "Lido" : "Ñ. Lido",
                            icon: item.read === "S" ? "beenhere" : "bookmark_border",
                            iconColor: item.read === "S" ? "#81C784" : "#FFE082"
                        };
                    });
                    return [2 /*return*/, event.sender.send("realodClassificadoresList", {
                            count: count,
                            data: filterResults
                        })];
                case 6:
                    error_1 = _a.sent();
                    event === null || event === void 0 ? void 0 : event.sender.send("reloadNotificationGrid", {
                        success: false,
                        msg: error_1
                    });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=index.js.map