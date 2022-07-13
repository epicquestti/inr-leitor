"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Classificador = /** @class */ (function () {
    function Classificador() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Classificador.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ length: 200, nullable: false }),
        __metadata("design:type", String)
    ], Classificador.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Date)
    ], Classificador.prototype, "criadoEm");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Date)
    ], Classificador.prototype, "publicadoEm");
    __decorate([
        (0, typeorm_1.Column)({ length: 1, nullable: false }),
        __metadata("design:type", String)
    ], Classificador.prototype, "read");
    Classificador = __decorate([
        (0, typeorm_1.Entity)("Classificador")
    ], Classificador);
    return Classificador;
}());
exports["default"] = Classificador;
//# sourceMappingURL=Classificador.js.map