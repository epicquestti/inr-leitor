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
exports.__esModule = true;
exports.versionTools = exports.stringGenerator = exports.numberGenerator = exports.PUT = exports.POST = exports.GET = exports.DELETE = exports.initDb = void 0;
var database_1 = require("./database");
__createBinding(exports, database_1, "default", "initDb");
var HTTP_1 = require("./HTTP");
__createBinding(exports, HTTP_1, "DELETE");
__createBinding(exports, HTTP_1, "GET");
__createBinding(exports, HTTP_1, "POST");
__createBinding(exports, HTTP_1, "PUT");
var Random_1 = require("./Random");
__createBinding(exports, Random_1, "numberGenerator");
__createBinding(exports, Random_1, "stringGenerator");
exports.versionTools = __importStar(require("./version"));
//# sourceMappingURL=index.js.map